"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Address = {
  id: string;
  label: string; // ex: "Casa", "Trabalho"
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
};

export type Card = {
  id: string;
  brand: string; // ex: "Visa", "Mastercard"
  holder: string;
  last4: string;
  expiry: string; // MM/AA
};

export type User = {
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  cards: Card[];
};

type StoredUser = User & { password: string };

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loaded: boolean;
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  checkEmailExists: (email: string) => boolean;
  resetPassword: (email: string, newPassword: string) => { ok: boolean; error?: string };
  updateProfile: (data: { name?: string; avatar?: string }) => { ok: boolean; error?: string };
  changePassword: (currentPassword: string, newPassword: string) => { ok: boolean; error?: string };
  addAddress: (address: Omit<Address, "id">) => { ok: boolean; error?: string };
  updateAddress: (id: string, address: Omit<Address, "id">) => { ok: boolean; error?: string };
  removeAddress: (id: string) => void;
  addCard: (card: Omit<Card, "id">) => { ok: boolean; error?: string };
  removeCard: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Result = { ok: boolean; error?: string };

const USERS_KEY = "fh_users";
const SESSION_KEY = "fh_session";

function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    // Garante compatibilidade com contas criadas antes destes campos existirem.
    return parsed.map((u: StoredUser) => ({
      ...u,
      addresses: u.addresses ?? [],
      cards: u.cards ?? [],
    }));
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(u: StoredUser): User {
  const { password: _password, ...publicUser } = u;
  void _password;
  return publicUser;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (sessionEmail) {
      const found = getUsers().find((u) => u.email === sessionEmail);
      if (found) setUser(toPublicUser(found));
    }
    setLoaded(true);
  }, []);

  function signup(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "Já existe uma conta com este e-mail." };
    }

    const newUser: StoredUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      addresses: [],
      cards: [],
    };
    saveUsers([...users, newUser]);
    // Não faz login automático: o cadastro leva de volta à tela de entrar.
    return { ok: true };
  }

  function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const found = users.find((u) => u.email === normalizedEmail);

    if (!found || found.password !== password) {
      return { ok: false, error: "E-mail ou senha incorretos." };
    }

    localStorage.setItem(SESSION_KEY, normalizedEmail);
    setUser(toPublicUser(found));
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function checkEmailExists(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    return getUsers().some((u) => u.email === normalizedEmail);
  }

  function resetPassword(email: string, newPassword: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const index = users.findIndex((u) => u.email === normalizedEmail);

    if (index === -1) {
      return { ok: false, error: "Não encontramos uma conta com este e-mail." };
    }
    if (newPassword.length < 6) {
      return { ok: false, error: "A nova senha precisa ter pelo menos 6 caracteres." };
    }

    users[index] = { ...users[index], password: newPassword };
    saveUsers(users);
    return { ok: true };
  }

  function withCurrentUser<T>(
    fn: (users: StoredUser[], index: number) => T,
    fallback: T
  ): T {
    if (!user) return fallback;
    const users = getUsers();
    const index = users.findIndex((u) => u.email === user.email);
    if (index === -1) return fallback;
    return fn(users, index);
  }

  function updateProfile(data: { name?: string; avatar?: string }) {
    return withCurrentUser<Result>(
      (users, index) => {
        const updated: StoredUser = {
          ...users[index],
          ...(data.name !== undefined ? { name: data.name.trim() } : {}),
          ...(data.avatar !== undefined ? { avatar: data.avatar } : {}),
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false, error: "Sessão inválida." }
    );
  }

  function changePassword(currentPassword: string, newPassword: string) {
    return withCurrentUser<Result>(
      (users, index) => {
        if (users[index].password !== currentPassword) {
          return { ok: false, error: "Senha atual incorreta." };
        }
        if (newPassword.length < 6) {
          return { ok: false, error: "A nova senha precisa ter pelo menos 6 caracteres." };
        }
        users[index] = { ...users[index], password: newPassword };
        saveUsers(users);
        return { ok: true };
      },
      { ok: false, error: "Sessão inválida." }
    );
  }

  function addAddress(address: Omit<Address, "id">) {
    return withCurrentUser<Result>(
      (users, index) => {
        const newAddress: Address = { ...address, id: crypto.randomUUID() };
        const updated: StoredUser = {
          ...users[index],
          addresses: [...users[index].addresses, newAddress],
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false, error: "Sessão inválida." }
    );
  }

  function updateAddress(id: string, address: Omit<Address, "id">) {
    return withCurrentUser<Result>(
      (users, index) => {
        const updated: StoredUser = {
          ...users[index],
          addresses: users[index].addresses.map((a) => (a.id === id ? { ...address, id } : a)),
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false, error: "Sessão inválida." }
    );
  }

  function removeAddress(id: string) {
    withCurrentUser<Result>(
      (users, index) => {
        const updated: StoredUser = {
          ...users[index],
          addresses: users[index].addresses.filter((a) => a.id !== id),
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false }
    );
  }

  function addCard(card: Omit<Card, "id">) {
    return withCurrentUser<Result>(
      (users, index) => {
        const newCard: Card = { ...card, id: crypto.randomUUID() };
        const updated: StoredUser = {
          ...users[index],
          cards: [...users[index].cards, newCard],
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false, error: "Sessão inválida." }
    );
  }

  function removeCard(id: string) {
    withCurrentUser<Result>(
      (users, index) => {
        const updated: StoredUser = {
          ...users[index],
          cards: users[index].cards.filter((c) => c.id !== id),
        };
        users[index] = updated;
        saveUsers(users);
        setUser(toPublicUser(updated));
        return { ok: true };
      },
      { ok: false }
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loaded,
        signup,
        login,
        logout,
        checkEmailExists,
        resetPassword,
        updateProfile,
        changePassword,
        addAddress,
        updateAddress,
        removeAddress,
        addCard,
        removeCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return ctx;
}
