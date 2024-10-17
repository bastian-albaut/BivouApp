export const mockBivouacs = [
  {
    id: 1,
    name: "Le Refuge des Cimes Enchantées",
    description: "Situé à flanc de montagne, ce bivouac vous offre un panorama exceptionnel sur les sommets enneigés et les vallées verdoyantes. Parfait pour les amoureux de la nature et les aventuriers en quête de tranquillité. Au petit matin, réveillez-vous avec le chant des oiseaux et profitez de l'air pur et frais des hauteurs. Le Refuge des Cimes Enchantées est un lieu privilégié pour déconnecter du quotidien et s’immerger dans la beauté brute des Alpes. Ce site herbeux offre de nombreuses possibilités de randonnées à proximité et un accès rapide à des cascades cachées.",
    price: 45,
    locationType: "montagne",
    fieldType: "herbeux",
    host: {
      userId: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
    },
    address: {
      number: "123",
      street: "Chemin des Alpages",
      city: "Hautes-Cimes",
      postalCode: "12345",
    },
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    photos: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    equipment: ["Eau", "Toilette", "Table picnic"], // List of available equipment
  },
  {
    id: 2,
    name: "Les Rives du Lac Silencieux",
    description: "Perché au bord du mystérieux Lac Silencieux, ce bivouac est l'endroit rêvé pour ceux qui recherchent la sérénité. Entouré d'une forêt dense et bordé par des eaux d'un bleu cristallin, c'est un coin de paradis pour les campeurs en quête de relaxation et de pêche. Au coucher du soleil, le lac devient un miroir parfait, reflétant les étoiles du ciel nocturne. Vous pourrez profiter de feux de camp paisibles et écouter les doux clapotis des vagues pendant que vous vous reposez. Un endroit parfait pour les familles et les groupes d'amis à la recherche d'un lieu de déconnexion totale.",
    price: 35,
    locationType: "lac",
    fieldType: "sableux",
    host: {
      userId: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
    },
    address: {
      number: "456",
      street: "Avenue des Rêves",
      city: "Ville du Lac",
      postalCode: "67890",
    },
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    photos: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    equipment: ["Eau", "Douche", "Barbecue"], // List of available equipment
  },
  {
    id: 3,
    name: "Le Sanctuaire des Arbres Ancestraux",
    description: "Plongé au cœur d’une forêt millénaire, ce bivouac est entouré de chênes et de pins majestueux, vous offrant une atmosphère mystérieuse et apaisante. Le Sanctuaire des Arbres Ancestraux est le lieu parfait pour renouer avec la nature. Le bruissement des feuilles dans le vent et le parfum du bois fraîchement coupé créent une ambiance idéale pour se ressourcer. Ce site est équipé de toutes les commodités nécessaires tout en vous permettant de vivre une véritable aventure en pleine nature. Idéal pour les randonneurs, les amoureux du plein air, et ceux qui cherchent à se reconnecter à la forêt.",
    price: 50,
    locationType: "forêt",
    fieldType: "boisé",
    host: {
      userId: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "321-654-0987",
    },
    address: {
      number: "789",
      street: "Allée des Vieux Chênes",
      city: "Bois Ancien",
      postalCode: "34567",
    },
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
    photos: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
    equipment: ["Eau", "Toilette", "Électricité"], // List of available equipment
  },
];
