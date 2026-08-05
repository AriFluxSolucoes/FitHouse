"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Package,
  LogOut,
  User as UserIcon,
  Camera,
  MapPin,
  CreditCard,
  Lock,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { useAuth, type Address, type Card as CardType } from "@/lib/auth";
import { useStore } from "@/lib/store";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import BackButton from "@/components/BackButton";

const emptyAddress: Omit<Address, "id"> = {
  label: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  zip: "",
};

const emptyCard: Omit<CardType, "id"> = {
  brand: "",
  holder: "",
  last4: "",
  expiry: "",
};

export default function ProfilePage() {
  const {
    user,
    isLoggedIn,
    loaded,
    logout,
    updateProfile,
    changePassword,
    addAddress,
    removeAddress,
    addCard,
    removeCard,
  } = useAuth();
  const { favorites, cartCount, clearCart, clearFavorites } = useStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dados da conta
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(user?.name ?? "");
  const [profileMsg, setProfileMsg] = useState("");

  // Endereço
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressDraft, setAddressDraft] = useState(emptyAddress);
  const [addressError, setAddressError] = useState("");

  // Cartão
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDraft, setCardDraft] = useState(emptyCard);
  const [cardNumberDraft, setCardNumberDraft] = useState("");
  const [cardError, setCardError] = useState("");

  // Senha
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  function handleLogout() {
    logout();
    clearCart();
    clearFavorites();
    router.push("/");
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    if (!nameDraft.trim()) return;
    updateProfile({ name: nameDraft.trim() });
    setEditingName(false);
    setProfileMsg("Nome atualizado.");
    setTimeout(() => setProfileMsg(""), 2500);
  }

  function handleAddAddress(e: React.FormEvent) {
    e.preventDefault();
    setAddressError("");
    const { label, street, number, neighborhood, city, state, zip } = addressDraft;
    if (!label || !street || !number || !neighborhood || !city || !state || !zip) {
      setAddressError("Preencha todos os campos obrigatórios.");
      return;
    }
    const result = addAddress(addressDraft);
    if (!result.ok) {
      setAddressError(result.error ?? "Não foi possível salvar o endereço.");
      return;
    }
    setAddressDraft(emptyAddress);
    setShowAddressForm(false);
  }

  function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    setCardError("");
    const digits = cardNumberDraft.replace(/\D/g, "");
    if (!cardDraft.brand || !cardDraft.holder || digits.length < 12 || !cardDraft.expiry) {
      setCardError("Preencha todos os campos corretamente.");
      return;
    }
    const result = addCard({ ...cardDraft, last4: digits.slice(-4) });
    if (!result.ok) {
      setCardError(result.error ?? "Não foi possível salvar o cartão.");
      return;
    }
    setCardDraft(emptyCard);
    setCardNumberDraft("");
    setShowCardForm(false);
  }

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (newPassword !== confirmNewPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }
    const result = changePassword(currentPassword, newPassword);
    if (!result.ok) {
      setPasswordError(result.error ?? "Não foi possível alterar a senha.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordSuccess("Senha alterada com sucesso.");
    setShowPasswordForm(false);
  }

  if (loaded && !isLoggedIn) {
    return (
      <main className="flex flex-col min-h-screen bg-paper">
        <div className="sticky top-0 z-30 shadow-sm">
          <TopBar />
          <Header />
          <CategoryNav />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center gap-4">
          <BackButton />
          <p className="text-ink-soft">Você precisa entrar para ver seu perfil.</p>
          <Link
            href="/login?redirect=/perfil"
            className="bg-ink text-white text-sm font-semibold uppercase tracking-wide py-3 px-6 hover:bg-ink-soft transition-colors"
          >
            Entrar
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-paper">
      <div className="sticky top-0 z-30 shadow-sm">
        <TopBar />
        <Header />
        <CategoryNav />
      </div>

      <section className="px-4 sm:px-6 py-10 max-w-2xl mx-auto w-full flex-1">
        <BackButton className="mb-6" />

        <h1 className="font-display text-2xl text-ink mb-6">minha conta</h1>

        {/* Foto + nome */}
        <div className="flex items-center gap-4 pb-6 border-b border-hair">
          <button
            type="button"
            onClick={handleAvatarClick}
            aria-label="Alterar foto de perfil"
            className="relative w-16 h-16 rounded-full bg-fog border border-hair flex items-center justify-center shrink-0 overflow-hidden group"
          >
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={26} className="text-ink" strokeWidth={1.5} />
            )}
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera size={18} className="text-white" />
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <div className="min-w-0 flex-1">
            {editingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  autoFocus
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="border border-hair focus:border-ink outline-none px-2 py-1.5 text-sm flex-1 min-w-0"
                />
                <button type="submit" aria-label="Salvar nome" className="text-ink hover:opacity-60">
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Cancelar"
                  onClick={() => {
                    setEditingName(false);
                    setNameDraft(user?.name ?? "");
                  }}
                  className="text-ink-soft hover:opacity-60"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <p className="font-display text-lg text-ink truncate">{user?.name}</p>
                <button
                  type="button"
                  aria-label="Editar nome"
                  onClick={() => setEditingName(true)}
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
            <p className="text-sm text-ink-soft truncate">{user?.email}</p>
            {profileMsg && <p className="text-xs text-green-700 mt-1">{profileMsg}</p>}
          </div>
        </div>

        {/* Favoritos / sacola / pedidos */}
        <div className="grid grid-cols-3 gap-3 py-6 border-b border-hair">
          <Link
            href="/favoritos"
            className="flex flex-col items-center gap-2 border border-hair hover:border-ink py-6 transition-colors"
          >
            <Heart size={22} className="text-ink" strokeWidth={1.5} />
            <span className="text-sm text-ink">Favoritos</span>
            <span className="text-xs text-ink-soft">{favorites.length} itens</span>
          </Link>
          <Link
            href="/carrinho"
            className="flex flex-col items-center gap-2 border border-hair hover:border-ink py-6 transition-colors"
          >
            <ShoppingBag size={22} className="text-ink" strokeWidth={1.5} />
            <span className="text-sm text-ink">Sacola</span>
            <span className="text-xs text-ink-soft">{cartCount} itens</span>
          </Link>
          <Link
            href="/pedidos"
            className="flex flex-col items-center gap-2 border border-hair hover:border-ink py-6 transition-colors"
          >
            <Package size={22} className="text-ink" strokeWidth={1.5} />
            <span className="text-sm text-ink">Pedidos</span>
            <span className="text-xs text-ink-soft">ver histórico</span>
          </Link>
        </div>

        {/* Endereços */}
        <div className="py-6 border-b border-hair">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-semibold text-ink text-sm uppercase tracking-wide">Endereços</h2>
            </div>
            {!showAddressForm && (
              <button
                type="button"
                onClick={() => setShowAddressForm(true)}
                className="flex items-center gap-1 text-xs font-semibold text-ink hover:underline"
              >
                <Plus size={14} />
                {user && user.addresses.length > 0 ? "Adicionar" : "Cadastrar endereço"}
              </button>
            )}
          </div>

          {user && user.addresses.length === 0 && !showAddressForm && (
            <p className="text-sm text-ink-soft">
              Você ainda não tem endereços cadastrados. Cadastre um para agilizar suas compras.
            </p>
          )}

          {user && user.addresses.length > 0 && (
            <ul className="flex flex-col gap-3 mb-4">
              {user.addresses.map((addr) => (
                <li
                  key={addr.id}
                  className="flex items-start justify-between gap-3 border border-hair p-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-ink">{addr.label}</p>
                    <p className="text-ink-soft">
                      {addr.street}, {addr.number}
                      {addr.complement ? ` — ${addr.complement}` : ""}
                    </p>
                    <p className="text-ink-soft">
                      {addr.neighborhood}, {addr.city} - {addr.state}
                    </p>
                    <p className="text-ink-soft">CEP {addr.zip}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remover endereço"
                    onClick={() => removeAddress(addr.id)}
                    className="text-ink-soft hover:text-red-600 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showAddressForm && (
            <form onSubmit={handleAddAddress} className="flex flex-col gap-3 border border-hair p-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Apelido (ex: Casa)"
                  value={addressDraft.label}
                  onChange={(e) => setAddressDraft({ ...addressDraft, label: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
                <input
                  placeholder="Rua"
                  value={addressDraft.street}
                  onChange={(e) => setAddressDraft({ ...addressDraft, street: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
                <input
                  placeholder="Número"
                  value={addressDraft.number}
                  onChange={(e) => setAddressDraft({ ...addressDraft, number: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
                />
                <input
                  placeholder="Complemento (opcional)"
                  value={addressDraft.complement}
                  onChange={(e) => setAddressDraft({ ...addressDraft, complement: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
                />
                <input
                  placeholder="Bairro"
                  value={addressDraft.neighborhood}
                  onChange={(e) => setAddressDraft({ ...addressDraft, neighborhood: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
                <input
                  placeholder="Cidade"
                  value={addressDraft.city}
                  onChange={(e) => setAddressDraft({ ...addressDraft, city: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
                />
                <input
                  placeholder="UF"
                  maxLength={2}
                  value={addressDraft.state}
                  onChange={(e) => setAddressDraft({ ...addressDraft, state: e.target.value.toUpperCase() })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
                />
                <input
                  placeholder="CEP"
                  value={addressDraft.zip}
                  onChange={(e) => setAddressDraft({ ...addressDraft, zip: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
              </div>

              {addressError && <p className="text-xs text-red-600">{addressError}</p>}

              <div className="flex gap-2 mt-1">
                <button
                  type="submit"
                  className="bg-ink text-white text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:bg-ink-soft transition-colors"
                >
                  Salvar endereço
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddressForm(false);
                    setAddressDraft(emptyAddress);
                    setAddressError("");
                  }}
                  className="border border-hair text-ink text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:border-ink transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Cartões */}
        <div className="py-6 border-b border-hair">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-semibold text-ink text-sm uppercase tracking-wide">Cartões</h2>
            </div>
            {!showCardForm && (
              <button
                type="button"
                onClick={() => setShowCardForm(true)}
                className="flex items-center gap-1 text-xs font-semibold text-ink hover:underline"
              >
                <Plus size={14} />
                {user && user.cards.length > 0 ? "Adicionar" : "Cadastrar cartão"}
              </button>
            )}
          </div>

          {user && user.cards.length === 0 && !showCardForm && (
            <p className="text-sm text-ink-soft">Nenhum cartão cadastrado ainda.</p>
          )}

          {user && user.cards.length > 0 && (
            <ul className="flex flex-col gap-3 mb-4">
              {user.cards.map((card) => (
                <li
                  key={card.id}
                  className="flex items-center justify-between gap-3 border border-hair p-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-ink">
                      {card.brand} •••• {card.last4}
                    </p>
                    <p className="text-ink-soft">
                      {card.holder} · venc. {card.expiry}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remover cartão"
                    onClick={() => removeCard(card.id)}
                    className="text-ink-soft hover:text-red-600 transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showCardForm && (
            <form onSubmit={handleAddCard} className="flex flex-col gap-3 border border-hair p-4">
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={cardDraft.brand}
                  onChange={(e) => setCardDraft({ ...cardDraft, brand: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2 bg-paper"
                >
                  <option value="">Bandeira</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Elo">Elo</option>
                  <option value="American Express">American Express</option>
                </select>
                <input
                  placeholder="Nome impresso no cartão"
                  value={cardDraft.holder}
                  onChange={(e) => setCardDraft({ ...cardDraft, holder: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
                <input
                  placeholder="Número do cartão"
                  inputMode="numeric"
                  value={cardNumberDraft}
                  onChange={(e) => setCardNumberDraft(e.target.value)}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
                <input
                  placeholder="Validade (MM/AA)"
                  value={cardDraft.expiry}
                  onChange={(e) => setCardDraft({ ...cardDraft, expiry: e.target.value })}
                  className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm col-span-2"
                />
              </div>

              <p className="text-[11px] text-ink-soft">
                Por segurança, guardamos apenas os 4 últimos dígitos do seu cartão.
              </p>

              {cardError && <p className="text-xs text-red-600">{cardError}</p>}

              <div className="flex gap-2 mt-1">
                <button
                  type="submit"
                  className="bg-ink text-white text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:bg-ink-soft transition-colors"
                >
                  Salvar cartão
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCardForm(false);
                    setCardDraft(emptyCard);
                    setCardNumberDraft("");
                    setCardError("");
                  }}
                  className="border border-hair text-ink text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:border-ink transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Senha */}
        <div className="py-6 border-b border-hair">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-ink" strokeWidth={1.5} />
              <h2 className="font-semibold text-ink text-sm uppercase tracking-wide">Senha</h2>
            </div>
            {!showPasswordForm && (
              <button
                type="button"
                onClick={() => setShowPasswordForm(true)}
                className="text-xs font-semibold text-ink hover:underline"
              >
                Redefinir senha
              </button>
            )}
          </div>

          {passwordSuccess && !showPasswordForm && (
            <p className="text-sm text-green-700">{passwordSuccess}</p>
          )}

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Nova senha (mín. 6 caracteres)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border border-hair focus:border-ink outline-none px-3 py-2 text-sm"
              />

              {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}

              <div className="flex gap-2 mt-1">
                <button
                  type="submit"
                  className="bg-ink text-white text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:bg-ink-soft transition-colors"
                >
                  Salvar nova senha
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setPasswordError("");
                  }}
                  className="border border-hair text-ink text-xs font-semibold uppercase tracking-wide px-4 py-2.5 hover:border-ink transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-hair hover:border-ink text-ink text-sm font-semibold uppercase tracking-wide py-3 mt-6 transition-colors"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </section>
    </main>
  );
}
