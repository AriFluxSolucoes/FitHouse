export const navLinks = [
  "Ofertas",
  "Novidades",
  "Feminino",
  "Masculino",
  "Conjuntos",
  "Acessórios",
  "Mochilas",
  "Treino",
  "Macacão",
];

export const circleCategories = [
  "Leggings",
  "Tops",
  "Conjuntos",
  "Shorts",
  "Camisetas",
  "Acessórios",
  "Calças",
  "Plus Size",
  "Casacos",
];


export const allCategoryLabels = Array.from(new Set([...navLinks, ...circleCategories]));

// Converte um nome de categoria em um slug de URL amigável (sem acentos).
export function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

// Encontra o nome de exibição original a partir de um slug (para títulos de página).
export function labelFromSlug(slug: string) {
  const found = allCategoryLabels.find((label) => slugify(label) === slug);
  return found ?? slug;
}

export type Review = {
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  colors?: number;
  image?: string; // 👈 novo campo
  description?: string;
  reviewList?: Review[];
  // slugs de categoria (ex: "leggings", "feminino", "treino") usados
  // pela navbar e pelos círculos de categoria para filtrar produtos.
  category: string[];
  isNew?: boolean;
};

const defaultReviews: Review[] = [
  {
    author: "Camila R.",
    rating: 5,
    date: "12/06/2026",
    comment: "Tecido de ótima qualidade, veste super bem e não fica transparente. Recomendo!",
  },
  {
    author: "Bruno S.",
    rating: 4,
    date: "28/05/2026",
    comment: "Muito bom, entrega rápida. Só achei o tamanho um pouco ajustado, pediria um número acima.",
  },
  {
    author: "Fernanda A.",
    rating: 5,
    date: "03/05/2026",
    comment: "Já é o terceiro que compro, qualidade sempre excelente e o caimento é perfeito para treino.",
  },
];

export const products: Product[] = [
{ id: "p1", name: "Legging alta compressão", price: 89.9, originalPrice: 149.9, rating: 4.6, reviews: 812, colors: 3, image: "https://www.orbisfitness.com.br/app-orbis/assets/images/dinamica/produto/1370/cor_0/zoom/3320marinho-calca-legging-fitness-feminina-alta-compressao-cintura-alta-poliamida-161024-597c45.jpg",
    description: "Legging de alta compressão desenvolvida para treinos intensos. Tecido tecnológico com secagem rápida, cintura alta que modela o corpo e não marca a roupa íntima. Costura reforçada nas áreas de maior movimento para durabilidade em qualquer tipo de treino.",
    reviewList: defaultReviews,
    category: ["leggings", "feminino", "treino"],
  },
{ id: "p2", name: "Conjunto top + legging", price: 139.9, originalPrice: 219.9, rating: 4.8, reviews: 340, colors: 2, image: "https://adaptive-images.uooucdn.com.br/ik-seo/tr:w-700,h-1050,fo-custom,e-sharpen,pr-true,pr-true,q-90/a22432-ogxytnpxyz0/pv/ce/da/0d/e17c0d3daa0ee81a8ada4560d4/conjunto-feminino-fitness-legging-e-top-bordo-1-1.jpg",
    description: "Conjunto completo com top e legging combinando. Tecido seamless de compressão média, respirável e com toque macio. Ideal para academia, yoga ou uso casual, com caimento que valoriza o corpo sem apertar.",
    reviewList: defaultReviews,
    category: ["conjuntos", "feminino", "treino"],
  },
  
  { id: "p10", name: "Macacão fitness", price: 159.9, originalPrice: 219.9, rating: 4.7, reviews: 203, image: "https://dlkmodas.fbitsstatic.net/img/p/macacao-fitness-feminino-marrom-canelado-com-bojo-seamless-dlk-84064/310374.jpg?w=1000&h=1428&v=202501291307",
    description: "Macacão fitness em tecido canelado seamless, com bojo removível e modelagem que valoriza o corpo. Ótimo para treinos em dias mais frios ou para compor um look esportivo.",
    reviewList: defaultReviews,
    category: ["feminino", "inverno", "macacao"],
  },
  
  { id: "p3", name: "Conjunto top + Legging", price: 119.9, originalPrice: 149.9, rating: 4.5, reviews: 1204, colors: 4, image: "https://cdn1.ozone.ru/s3/multimedia-g/c600/6238812064.jpg",
    description: "Conjunto esportivo com tela respirável nas laterais para maior ventilação durante o treino. Cós elástico confortável, tecido leve de secagem rápida e bolso interno para pequenos objetos.",
    reviewList: defaultReviews,
    category: ["treino", "feminino", "conjuntos"],
  },
  

  { id: "p4", name: "Conjunto top + Saia", price: 54.9, rating: 4.3, reviews: 567, colors: 5, image: "https://http2.mlstatic.com/D_NQ_NP_767339-MLB85119717342_052025-O-3-conjunto-academia-top-com-ziper-e-bojo-e-short-saia-babado.webp",
    description: "Top cropped modelo nadador com boa sustentação, ideal para treinos de alto impacto. Alças largas e reguláveis, tecido com proteção UV e toque seco mesmo durante o suor intenso.",
    reviewList: defaultReviews,
    category: ["tops", "feminino", "treino", "conjuntos"],
  },
 

  { id: "p5", name: "Jaqueta corta-vento", price: 179.0, originalPrice: 259.0, rating: 4.7, reviews: 289, image: "https://images.tcdn.com.br/img/img_prod/686772/corta_vento_masculino_557_1_a54c82566cb318622956bcc578f4a7e8.jpg",
    description: "Jaqueta corta-vento leve e resistente à água, perfeita para corridas ao ar livre em dias frios. Capuz ajustável, bolsos com zíper e tecido que permite total liberdade de movimento.",
    reviewList: defaultReviews,
    category: ["inverno", "masculino", "treino"],
  },
  
  { id: "p7", name: "Regata dry fit masculina", price: 59.9, rating: 4.6, reviews: 431, colors: 2, image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7c4ukm13l1mdb",
    description: "Regata masculina em tecido dry fit que absorve o suor e seca rapidamente. Corte modelador e tecido com leve elasticidade para acompanhar cada movimento do treino.",
    reviewList: defaultReviews,
    category: ["masculino", "treino"],
  },
 
  { id: "p9", name: "Camiseta básica algodão", price: 44.9, rating: 4.2, reviews: 1502, colors: 6, image: "https://tse1.mm.bing.net/th/id/OIP.c7HxIZTOrhPJ1NIDJTqYqwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Camiseta básica 100% algodão, macia e confortável para o dia a dia. Corte reto, gola careca reforçada e tecido de alta durabilidade que mantém a cor após várias lavagens.",
    reviewList: defaultReviews,
    category: ["masculino", "camisetas", "treino"],
  },

   {
    id: "p23",
    name: "Camiseta oversized masculina treino",
    price: 64.9,
    rating: 4.4,
    reviews: 121,
    image: "https://davyjones.com.br/wp-content/uploads/2025/01/3101-Camiseta-Oversized-Masculina-preta-em-Malha-Estruturada-High-Level-11.jpg",
    colors: 4,
    description:
      "Camiseta oversized em tecido leve e respirável, corte solto e moderno. Boa opção tanto para treino quanto para o dia a dia.",
    reviewList: defaultReviews,
    category: ["masculino", "treino", "camisetas"],
    isNew: true,
  },
  
  {
    id: "p11",
    name: "Camiseta uV 50 Proteção Solar Segunda Pele",
    price: 79.9,
    originalPrice: 119.9,
    rating: 4.6,
    reviews: 154,
    image: "https://down-br.img.susercontent.com/file/br-11134207-7qukw-ljkn61h7h2cm3b",
    colors: 4,
    description:
      "Camiseta termica,, proteção UV 50, ideal para atividades ao ar livre. Tecido leve e respirável que mantém a temperatura do corpo estável, mesmo sob sol intenso.",
    reviewList: defaultReviews,
    category: ["camisetas", "masculino", "treino"],
    isNew: true,
  },
 
{
    id: "p18",
    name: "Legging plus size cós alto",
    price: 99.9,
    originalPrice: 149.9,
    rating: 4.8,
    reviews: 276,
    image: "https://images.tcdn.com.br/img/img_prod/705643/calca_legging_basica_plus_size_alta_compressao_modeladora_cintura_alta_cor_verde_militar_76253_1_26e8b7d96b96aeba28d36a419600b5d4.jpg",
    colors: 3,
    description:
      "Legging plus size com cós super alto modelador e tecido de compressão firme. Caimento pensado para valorizar curvas com total conforto durante o treino.",
    reviewList: defaultReviews,
    category: ["leggings", "plus-size", "feminino", "treino"],
  },
  {
    id: "p20",
    name: "Conjunto moletom inverno",
    price: 189.9,
    originalPrice: 259.9,
    rating: 4.7,
    reviews: 198,
    image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8z9ju4yycci9f",
    colors: 2,
    description:
      "Conjunto de moletom flanelado com blusa de capuz e calça jogger. Tecido quentinho para dias frios, ótimo para treino ao ar livre ou uso casual.",
    reviewList: defaultReviews,
    category: ["conjuntos", "inverno", "masculino", "feminino"],
  },
  {
    id: "p13",
    name: "Squeeze academia 1L",
    price: 39.9,
    rating: 4.7,
    reviews: 412,
    image: "https://http2.mlstatic.com/D_NQ_NP_764454-MLB86039042520_062025-O-garrafa-termica-esportiva-800ml-para-academia-com-canudo.webp",
    description:
      "Squeeze de 1 litro em material atóxico, livre de BPA, com marcadores de volume e bico de vedação anti-vazamento. Perfeito para acompanhar a hidratação durante o treino.",
    reviewList: defaultReviews,
    category: ["acessorios", "treino"],
    isNew: true,
  },
  {
    id: "p14",
    name: "Luva de treino em couro sintético",
    price: 44.9,
    originalPrice: 64.9,
    rating: 4.3,
    reviews: 187,
    image: "https://i.pinimg.com/originals/cb/6b/00/cb6b0025276c5b30472f6827a790fb6d.jpg",
    description:
      "Luva de treino acolchoada que protege as mãos durante levantamentos e reduz calosidades. Fechamento em velcro ajustável e ventilação entre os dedos.",
    reviewList: defaultReviews,
    category: ["acessorios", "masculino", "treino"],
  },
  {
    id: "p15",
    name: "Mochila esportiva impermeável",
    price: 129.9,
    originalPrice: 179.9,
    rating: 4.5,
    reviews: 231,
    image: "https://5.imimg.com/data5/ECOM/Default/2024/11/468361029/BK/IM/YO/208146549/untitleddesign-4-500x500.jpg",
    description:
      "Mochila esportiva com compartimento térmico, bolso para tênis separado e tecido impermeável. Alças acolchoadas para maior conforto no dia a dia.",
    reviewList: defaultReviews,
    category: ["acessorios", "treino", "mochilas"],
    isNew: true,
  },

  {
    id: "p17",
    name: "Chinelo slide esportivo",
    price: 59.9,
    rating: 4.2,
    reviews: 289,
    image: "https://cea.vtexassets.com/arquivos/ids/23066266/Chinelo-Slide-Feminino-Esportivo-Ace-Preto-9976365-Preto_2.jpg?v=637436593638930000",
    colors: 5,
    description:
      "Chinelo slide leve e resistente à água, com palmilha anatômica confortável. Perfeito para depois do treino ou dias de praia.",
    reviewList: defaultReviews,
    category: ["calcados", "masculino", "feminino"],
  },
 
  {
    id: "p21",
    name: "Casaco fitness plus size",
    price: 159.9,
    rating: 4.6,
    reviews: 87,
    image: "https://www.fisicofitness.com.br/app-fisicofitness/assets/images/dinamica/produto/880/cor_0/cspsrb9109me-casaco-monique-plus-size-240524-20db07.jpg",
    colors: 2,
    description:
      "Casaco fitness plus size com forro térmico leve e punhos ajustáveis. Corte pensado para liberdade de movimento sem perder o caimento.",
    reviewList: defaultReviews,
    category: ["plus-size", "inverno", "feminino", "casacos"],
  },
  {
    id: "p22",
    name: "Short saia para tênis",
    price: 84.9,
    rating: 4.6,
    reviews: 165,
    image: "https://http2.mlstatic.com/D_NQ_NP_669511-MLA80553184752_112024-O.webp",
    colors: 3,
    description:
      "Short saia com forro interno de compressão, ideal para tênis, corrida e treino funcional. Modelagem feminina que une estilo e performance.",
    reviewList: defaultReviews,
    category: ["shorts", "feminino", "treino"],
    isNew: true,
  },
 
  {
    id: "p24",
    name: "Meia cano alto esportiva kit c/3",
    price: 34.9,
    originalPrice: 49.9,
    rating: 4.5,
    reviews: 342,
    image: "https://imgcentauro-a.akamaihd.net/1366x1366/M0PAGSDE.jpg",
    description:
      "Kit com 3 pares de meia cano alto com compressão leve e faixa de conforto. Tecido com controle de umidade para treinos longos.",
    reviewList: defaultReviews,
    category: ["acessorios", "treino"],
  },
  {
    id: "p25",
    name: "Boné esportivo dry fit",
    price: 49.9,
    rating: 4.3,
    reviews: 176,
    image: "https://th.bing.com/th/id/R.f45381b045d81c978f321dd8eb00c101?rik=Lz8mqpPl%2fjN3KQ&riu=http%3a%2f%2fsupersports.com.vn%2fcdn%2fshop%2ffiles%2fFJ0736-100-1_1200x1200.jpg%3fv%3d1721789177&ehk=slJnEJNLsPGLH4aOk5NhYOgIgGecrgaskcduhjEItbA%3d&risl=&pid=ImgRaw&r=0",
    colors: 3,
    description:
      "Boné esportivo em tecido dry fit com ajuste traseiro e aba curva. Proteção contra o sol para corridas e treinos ao ar livre.",
    reviewList: defaultReviews,
    category: ["acessorios", "treino"],
    isNew: true,
  },
];