// src/data/adventuringGearSRD.js

export const ADVENTURING_GEAR_SRD = [
  // --- Equipo general ---

  {
    name: "Ábaco",
    type: "gear",
    rarity: "common",
    value: 2, // 2 gp
    weight: 2,
    description: "Marco de madera con cuentas, usado para realizar cálculos matemáticos básicos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // --- Consumibles alquímicos / arrojadizos ---

  {
    name: "Ácido (frasco)",
    type: "consumable",
    rarity: "common",
    value: 25,
    weight: 1,
    description: "Frasco de ácido corrosivo capaz de dañar objetos o criaturas al contacto. Se consume al usarlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Fuego de alquimista (frasco)",
    type: "consumable",
    rarity: "common",
    value: 50,
    weight: 1,
    description: "Líquido inflamable pegajoso que se adhiere y arde con intensidad al impactar. Se consume al usarlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // --- Munición (consumible) ---

  {
    name: "Flechas (20)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Veinte flechas estándar para arcos. La mayoría se pierde o rompe al usarlas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Agujas de cerbatana (50)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Cincuenta pequeñas agujas utilizadas como munición para cerbatana. Normalmente se pierden al usarlas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Virotes de ballesta (20)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 1.5,
    description: "Veinte virotes cortos para ballestas. Suelen romperse o perderse al dispararlos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Balas de honda (20)",
    type: "consumable",
    rarity: "common",
    value: 1, // 4 cp -> subido a 1 gp
    weight: 1.5,
    description: "Veinte pequeñas piedras o balines utilizados como munición para hondas. Normalmente se pierden.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // --- Consumibles varios (frascos / pociones / comida) ---

  {
    name: "Antitoxina (frasco)",
    type: "consumable",
    rarity: "common",
    value: 50,
    weight: 0,
    description: "Líquido preparado para ayudar a resistir venenos durante un tiempo limitado. Se consume al usarlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Arcane focus

  {
    name: "Enfoque arcano: cristal",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 1,
    description: "Cristal cuidadosamente tallado usado como foco para canalizar magia arcana.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque arcano: orbe",
    type: "gear",
    rarity: "common",
    value: 20,
    weight: 3,
    description: "Orbe de cristal o vidrio pesado que sirve como foco para lanzadores arcanos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque arcano: vara",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 2,
    description: "Vara sólida grabada con símbolos místicos usada para enfocar magia arcana.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque arcano: bastón",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 4,
    description: "Bastón robusto empleado tanto como apoyo al caminar como canal de energía mágica.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque arcano: varita",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 1,
    description: "Delgada varita de madera o hueso, preferida por lanzadores de conjuros precisos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Mochila / contenedores base

  {
    name: "Mochila",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 5,
    description: "Mochila sencilla de aventurero, con correas resistentes y espacio para equipo básico.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Bolsa de canicas (1,000)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 2,
    description: "Bolsa con mil pequeñas esferas metálicas. Se esparcen por el suelo y se consideran consumidas al usarlas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Barril",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 70,
    description: "Barril grande de madera, perfecto para almacenar líquidos o provisiones a granel.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Cesta",
    type: "gear",
    rarity: "common",
    value: 1, // 4 sp -> 0.4 -> mínimo 1
    weight: 2,
    description: "Cesta tejida de mimbre, útil para transportar objetos ligeros.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Saco de dormir",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 7,
    description: "Saco acolchado que ofrece comodidad y calor al dormir al aire libre.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Campanita",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pequeña campana de mano que emite un timbre agudo al agitarla.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Manta",
    type: "gear",
    rarity: "common",
    value: 1, // 5 sp -> 0.5 -> 1
    weight: 3,
    description: "Manta gruesa para abrigarse durante las noches frías de viaje.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Polea y aparejo",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 5,
    description: "Sistema simple de poleas y cuerda usado para levantar o mover cargas pesadas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Libro",
    type: "gear",
    rarity: "common",
    value: 25,
    weight: 5,
    description: "Libro encuadernado que puede contener conocimientos, historias o notas personales.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Botella de vidrio",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 2,
    description: "Botella de vidrio vacía, adecuada para contener líquidos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Cubo",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 2,
    description: "Cubo de madera para transportar agua u otros materiales.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Abrojos (bolsa de 20)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 2,
    description: "Pequeñas puntas metálicas diseñadas para dañar o ralentizar a quienes las pisan. Se consideran consumidas al usarlas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Vela",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Vela de sebo o cera que proporciona luz tenue durante unas horas y se consume al arder.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Estuche para virotes de ballesta",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Estuche rígido para transportar y proteger virotes de ballesta.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Estuche para mapas o pergaminos",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Tubo protector para guardar mapas, pergaminos y documentos importantes.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Cadena (3 m)",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 10,
    description: "Cadena de metal resistente de 3 metros de largo, útil para asegurar o arrastrar objetos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Tiza (1 pieza)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pequeña barra de tiza para marcar paredes, suelos u otros objetos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Cofre",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 25,
    description: "Cofre de madera reforzado, ideal para guardar tesoros u objetos de valor.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Kit de escalada",
    type: "gear",
    rarity: "common",
    value: 25,
    weight: 12,
    description: "Conjunto de pitones, cuerdas, arneses y ganchos diseñado para escalar superficies difíciles.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // --- Ropa ---

  {
    name: "Ropa común",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 3,
    description: "Ropa sencilla adecuada para campesinos, trabajadores y viajeros modestos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Ropa de disfraz",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 4,
    description: "Prendas extravagantes o llamativas usadas para actuaciones y disfraces.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Ropa fina",
    type: "gear",
    rarity: "common",
    value: 15,
    weight: 6,
    description: "Ropa de alta calidad, propia de nobles, comerciantes ricos o funcionarios importantes.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Ropa de viajero",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 4,
    description: "Conjunto resistente de ropa diseñado para largos viajes y condiciones variadas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Bolsa de componentes",
    type: "gear",
    rarity: "common",
    value: 25,
    weight: 2,
    description: "Bolsa con compartimentos donde se guardan componentes materiales de conjuros.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // --- Palanca, herramientas físicas ---

  {
    name: "Palanca",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 5,
    description: "Palanca de hierro usada para forzar puertas, tapas o piedras.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Druidic focus

  {
    name: "Enfoque druídico: ramita de muérdago",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pequeña ramita de muérdago sagrado usada por druidas para canalizar su magia.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque druídico: tótem",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pequeña figura o amuleto que representa un espíritu animal o de la naturaleza.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque druídico: bastón de madera",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 4,
    description: "Bastón de madera viva, tallado con símbolos naturales y usado por druidas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Enfoque druídico: varita de tejo",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 1,
    description: "Varita flexible de madera de tejo, asociada a la vida y la muerte en la tradición druídica.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Equipo de pesca",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 4,
    description: "Kit que incluye sedal, anzuelos, plomadas y una pequeña caña simple.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Jarra o tanque",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Pequeña jarra o tanque de metal usada para beber cerveza, vino o agua.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Gancho de agarre",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 4,
    description: "Gancho metálico de múltiples puntas que se ata a una cuerda para escalar o enganchar objetos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Martillo",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 3,
    description: "Martillo de mano usado para clavar pitones o realizar trabajos básicos de carpintería.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Mazo (martillo pesado)",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 10,
    description: "Mazo grande de mango largo, adecuado para demoler y golpear objetos robustos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Kit de sanación",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 3,
    description: "Incluye vendajes, ungüentos y herramientas básicas para estabilizar a criaturas heridas (múltiples usos).",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Holy symbols

  {
    name: "Símbolo sagrado: amuleto",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 1,
    description: "Amuleto que muestra el símbolo de una deidad, usado como foco sagrado.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Símbolo sagrado: emblema",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 0,
    description: "Emblema o insignia con el símbolo de una deidad, se lleva sobre armadura o ropa.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Símbolo sagrado: relicario",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 2,
    description: "Pequeña caja o relicario que contiene reliquias o símbolos sagrados.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Agua bendita (frasco)",
    type: "consumable",
    rarity: "common",
    value: 25,
    weight: 1,
    description: "Agua consagrada que hiere a ciertos seres malignos o no muertos. Se consume al usarla.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Reloj de arena",
    type: "gear",
    rarity: "common",
    value: 25,
    weight: 1,
    description: "Reloj de arena que mide intervalos aproximados de tiempo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Trampa de caza",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 25,
    description: "Trampa metálica de muelle, diseñada para atrapar criaturas que la pisen (puede reutilizarse).",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Escritura

  {
    name: "Tinta (frasco de 30 ml)",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 0,
    description: "Tinta negra de buena calidad usada para escribir con pluma.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Pluma",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pluma sencilla utilizada para escribir sobre pergamino o papel.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Jarra o cántaro",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 4,
    description: "Jarra sencilla para transportar agua u otros líquidos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Escalera (3 m)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 25,
    description: "Escalera de madera portátil de unos 3 metros de altura.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  // Iluminación

  {
    name: "Lámpara",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Lámpara de aceite simple que emite luz en un pequeño radio (requiere aceite).",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Linterna de ojo de buey",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 2,
    description: "Linterna que enfoca la luz en un haz intenso en forma de cono.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Linterna con capucha",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 2,
    description: "Linterna cuya luz puede cubrirse con una capucha para ocultarla parcialmente.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Cerradura",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 1,
    description: "Cerradura robusta con una o más llaves, usada para asegurar puertas o cofres.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Lupa",
    type: "gear",
    rarity: "common",
    value: 100,
    weight: 0,
    description: "Lente de aumento que ayuda a examinar detalles pequeños o rastros diminutos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Esposas",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 6,
    description: "Grilletes de hierro usados para inmovilizar las muñecas de un prisionero.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Juego de comedor",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Incluye plato, taza y cubiertos plegables para comer en viaje.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Espejo de acero",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 0.5,
    description: "Pequeño espejo pulido que refleja la imagen con cierta claridad.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Aceite (frasco)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Frasco de aceite inflamable que puede usarse como combustible o para incendiar objetos. Se consume al usarlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Papel (1 hoja)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Hoja de papel fino para escritura o dibujo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Pergamino (1 hoja)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Hoja de pergamino tratada, usada para documentos oficiales o conjuros.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Perfume (frasco)",
    type: "consumable",
    rarity: "common",
    value: 5,
    weight: 0,
    description: "Fragancia concentrada, apreciada en cortes y reuniones formales. Se consume al usarla.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Pico de minero",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 10,
    description: "Herramienta pesada para excavar roca y minerales.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Piqueta (pitón)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0.25,
    description: "Clavo de metal que se ancla en roca o madera para asegurar cuerdas al escalar.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Veneno básico (frasco)",
    type: "consumable",
    rarity: "common",
    value: 100,
    weight: 0,
    description: "Veneno aplicado a armas o munición para infligir daño adicional. Se consume al usarlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Palo (3 m)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 7,
    description: "Palo largo de madera usado para sondear el terreno o activar trampas a distancia.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Olla de hierro",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 10,
    description: "Olla pesada para cocinar sobre el fuego de campamento.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Poción de curación",
    type: "consumable",
    rarity: "common",
    value: 50,
    weight: 0.5,
    description: "Poción mágica que restaura una cantidad moderada de puntos de golpe al beberla. Se consume al usarla.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Bolsa pequeña",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Pequeña bolsa de cuero usada a menudo como monedero o para componentes pequeños.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Carcaj",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Carcaj de cuero para transportar flechas o virotes.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Ariete portátil",
    type: "gear",
    rarity: "common",
    value: 4,
    weight: 35,
    description: "Pesado tronco reforzado con metal para derribar puertas u obstáculos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Raciones (1 día)",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 2,
    description: "Comida seca y conservada suficiente para alimentar a una criatura durante un día. Se consume al comerla.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Túnicas",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 4,
    description: "Túnicas largas usadas a menudo por magos, clérigos o académicos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Cuerda de cáñamo (15 m)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 10,
    description: "Tramo de 15 metros de cuerda de cáñamo resistente, útil para atar o escalar.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },
  {
    name: "Cuerda de seda (15 m)",
    type: "gear",
    rarity: "common",
    value: 10,
    weight: 5,
    description: "Cuerda de seda ligera y resistente, preferida por aventureros que escalan con frecuencia.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Saco",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0.5,
    description: "Saco de tela sencillo para guardar o transportar objetos pequeños.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Balanza de mercader",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 3,
    description: "Pequeña balanza con pesas para medir el valor de monedas y mercancías.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Cera de sello",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Barra de cera usada para sellar cartas y documentos con un anillo de sello.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Pala",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 5,
    description: "Herramienta para cavar zanjas, fosas o remover tierra y arena.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Silbato de señal",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Silbato pequeño que produce un sonido agudo, ideal para dar señales a distancia.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Anillo de sello",
    type: "gear",
    rarity: "common",
    value: 5,
    weight: 0,
    description: "Anillo grabado con un símbolo personal o heráldico, usado para sellar documentos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Jabón",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pastilla de jabón simple, usada para la higiene personal.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Libro de conjuros",
    type: "gear",
    rarity: "common",
    value: 50,
    weight: 3,
    description: "Volumen encuadernado que contiene conjuros de mago escritos en notación arcana.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Estacas de hierro (10)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 5,
    description: "Diez estacas de hierro usadas para asegurar tiendas, puertas u obstáculos improvisados.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Catalejo",
    type: "gear",
    rarity: "common",
    value: 1000,
    weight: 1,
    description: "Instrumento óptico que amplía objetos lejanos; extremadamente caro y poco común.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Tienda de campaña (2 personas)",
    type: "gear",
    rarity: "common",
    value: 2,
    weight: 20,
    description: "Pequeña tienda de campaña capaz de albergar hasta dos criaturas medianas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Yesquero",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Caja con pedernal, eslabón y yesca para encender fuego (puede usarse muchas veces).",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Antorcha",
    type: "consumable",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Antorcha de madera con trapo y brea, arde aproximadamente una hora y se consume al hacerlo.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Vial de vidrio",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 0,
    description: "Pequeño vial de vidrio con tapón, usado para guardar líquidos o pociones.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Odre (lleno)",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 5,
    description: "Odre de cuero para transportar agua u otros líquidos.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  },

  {
    name: "Piedra de afilar",
    type: "gear",
    rarity: "common",
    value: 1,
    weight: 1,
    description: "Piedra abrasiva para mantener el filo de armas y herramientas.",
    weaponData: null,
    armorData: null,
    isHomebrew: false
  }
];
