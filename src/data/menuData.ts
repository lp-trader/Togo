/**
 * Centralized data and configuration for Pastas To Go Demo Application.
 * All prices, descriptions, and demo configurations are editable here.
 */

export interface DemoExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface PastaOption {
  id: string;
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: number; // In USD ($)
  description: string;
  image: string;
  category: 'clasicas' | 'con-carne' | 'especiales';
  categoryLabel: string;
  tags: string[];
  prepTime: string;
  baseIngredients: string[]; // Ingredientes que el usuario puede quitar / excluir
  availableExtras: DemoExtraOption[];
}

export interface RestaurantConfig {
  name: string;
  slogan: string;
  secondarySlogan: string;
  currencySymbol: string;
  isDemoMode: boolean;
  demoDisclaimer: string;
  instagramHandle: string;
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Pastas To Go",
  slogan: "Tradición en un Bowl",
  secondarySlogan: "Pasta que va contigo, sabor que se queda",
  currencySymbol: "$",
  isDemoMode: true,
  demoDisclaimer: "Esta es una propuesta comercial de demostración para Pastas To Go. El pedido no ha sido enviado al restaurante y no se ha realizado ningún pago.",
  instagramHandle: "@pastastogovzla",
};

// Opciones de tipo de pasta para el bowl
export const PASTA_TYPES: PastaOption[] = [
  { id: 'spaghetti', name: 'Spaghetti', description: 'Clásica pasta larga' },
  { id: 'penne', name: 'Penne Rigate', description: 'Tubos estriados que retienen la salsa' },
  { id: 'fettuccine', name: 'Fettuccine', description: 'Cintas planas artesanales' },
  { id: 'fusilli', name: 'Fusilli', description: 'Espirales ideales para salsas densas' },
];

// Opciones de punto de cocción
export const COOKING_POINTS = [
  { id: 'al-dente', name: 'Al Dente', description: 'Firme al morder, tradición italiana (recomendado)' },
  { id: 'bien-cocida', name: 'Bien Cocida', description: 'Textura más suave y tierna' },
];

// Complementos y extras disponibles para agregar al bowl
export const CUSTOMIZATION_EXTRAS: DemoExtraOption[] = [
  { id: 'extra-parmesano', name: 'Extra Queso Parmesano rallado', price: 1.00 },
  { id: 'extra-albondigas', name: 'Doble porción de Albóndigas (3 uds)', price: 2.50 },
  { id: 'extra-salsa', name: 'Salsa adicional en el bowl', price: 1.00 },
  { id: 'champinones', name: 'Champiñones salteados al olivo', price: 1.50 },
  { id: 'pan-ajo', name: 'Pan artesanal al ajo y orégano', price: 1.50 },
  { id: 'aceite-picante', name: 'Toque de Aceite con Peperoncino', price: 0.50 },
  { id: 'albahaca-fresca', name: 'Hojas frescas de albahaca extra', price: 0.50 },
];

/**
 * 4 Platos iniciales del menú de demostración:
 * 1. Napolitana ($5)
 * 2. Pomodoro con Polpette ($6)
 * 3. Ragù di carne ($6)
 * 4. Pesto di basilico ($7)
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'napolitana',
    name: 'Napolitana',
    subtitle: 'Salsa de tomate natural',
    price: 5.00,
    description: 'Salsa de tomate natural, albahaca fresca y queso parmesano.',
    image: '/src/assets/images/pasta_napolitana_1792082757036.jpg',
    category: 'clasicas',
    categoryLabel: 'Clásica',
    tags: ['Tomate Natural', 'Albahaca Fresca', 'Parmesano'],
    prepTime: '10-12 min',
    baseIngredients: ['Queso Parmesano', 'Albahaca Fresca', 'Toque de Ajo', 'Salsa de Tomate Natural'],
    availableExtras: CUSTOMIZATION_EXTRAS,
  },
  {
    id: 'pomodoro-polpette',
    name: 'Pomodoro con Polpette',
    subtitle: 'Con albóndigas de res',
    price: 6.00,
    description: 'Salsa de tomate, albóndigas de res y queso parmesano.',
    image: '/src/assets/images/pasta_pomodoro_polpette_1792082757714.jpg',
    category: 'con-carne',
    categoryLabel: 'Con Carne',
    tags: ['Albóndigas de Res', 'Salsa de Tomate', 'Parmesano'],
    prepTime: '12-15 min',
    baseIngredients: ['Albóndigas de Res', 'Queso Parmesano', 'Albahaca Fresca', 'Salsa Pomodoro'],
    availableExtras: CUSTOMIZATION_EXTRAS,
  },
  {
    id: 'ragu-carne',
    name: 'Ragù di carne',
    subtitle: 'Carne y vino tinto',
    price: 6.00,
    description: 'Salsa de carne tradicional con un toque de vino tinto y queso parmesano.',
    image: '/src/assets/images/pasta_ragu_carne_1792082757613.jpg',
    category: 'con-carne',
    categoryLabel: 'Con Carne',
    tags: ['Carne Tradicional', 'Toque de Vino Tinto', 'Parmesano'],
    prepTime: '12-15 min',
    baseIngredients: ['Ragù de Carne', 'Queso Parmesano', 'Toque de Vino Tinto', 'Hierbas Italianas'],
    availableExtras: CUSTOMIZATION_EXTRAS,
  },
  {
    id: 'pesto-basilico',
    name: 'Pesto di basilico',
    subtitle: 'Albahaca y piñones',
    price: 7.00,
    description: 'Salsa de albahaca fresca, piñones y queso parmesano.',
    image: '/src/assets/images/pasta_pesto_basilico_1792082756888.jpg',
    category: 'especiales',
    categoryLabel: 'Especial',
    tags: ['Albahaca Fresca', 'Piñones', 'Parmesano'],
    prepTime: '8-10 min',
    baseIngredients: ['Pesto Genovés', 'Piñones Tostados', 'Queso Parmesano', 'Albahaca Fresca', 'Toque de Ajo'],
    availableExtras: CUSTOMIZATION_EXTRAS,
  },
];

export const HERO_IMAGE = '/src/assets/images/hero_pasta_bowl_1792082755452.jpg';
