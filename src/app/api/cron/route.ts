import { createClient } from '@/src/utils/supabase/server';
import * as cheerio from 'cheerio';

const REGEX = /^[^0-9]+$/;

const SEQUESTERED_LOCAL = [
  { name: 'Daiber Jesus Navas' },
  { name: 'Bieider Herrera' },
  { name: 'Héctor José Higaldo' },
  { name: 'Ángel Moisés Ramírez' },
  { name: 'Frenyermi Beñosis' },
  { name: 'Jesus Manuel' },
  { name: 'Manuel David Torres' },
  { name: 'Karen Gómez' },
  { name: 'Salvador Rivera' },
  { name: 'Mayra Alejandra Castro' },
  { name: 'Freddy Superlano' },
  { name: 'Biagio Pilieri' },
  { name: 'Perkins Rocha' },
  { name: 'Félix Arroyo' },
  { name: 'Luis Istúriz' },
  { name: 'Virgilio Laverde' },
  { name: 'Henry Salazar' },
  { name: 'Yulennis Aranguren' },
  { name: 'Williams Dávila' },
  { name: 'Endrick Medina' },
  { name: 'Américo de Grazia' },
  { name: 'Fernando Feo' },
  { name: 'José Camero' },
  { name: 'Roland Carreño' },
  { name: 'Beatriz Andrade' },
  { name: 'Rafael Sivira' },
  { name: 'Mónica Martínez Bowen' },
  { name: 'Carlos Molina' },
  { name: 'Dignora Hernandez' },
  { name: 'Ricardo Estévez' },
  { name: 'Gilberto Reina' },
  { name: 'Fernando Chuecos' },
  { name: 'Deisy Peña' },
  { name: 'Paúl León' },
  { name: 'Yousner Alvarado' },
  { name: 'Luis Lopez' },
  { name: 'Ana Carolina Guatia' },
  { name: 'Freddy Cimino' },
  { name: 'Leocenis García' },
  { name: 'Juan Freites' },
  { name: 'Luis Camacaro' },
  { name: 'Guillermo López' },
  { name: 'Emill Brandt' },
  { name: 'Carlos Julio Rojas' },
  { name: 'Gabriel González' },
  { name: 'Juan Diego Lucena' },
  { name: 'Leocadio Carrillo' },
  { name: 'Alfonso Andara' },
  { name: 'Ubencio Pacheco' },
  { name: 'Kennedy Tejeda' },
  { name: 'Carlos Chancellor' },
  { name: 'Yenny Barrios' },
  { name: 'Rocío San Miguel' },
  { name: 'Héctor Rovain' },
  { name: 'Rita Capriti' },
  { name: 'Pedro Lenin' },
  { name: 'Richard Granadillo' },
  { name: 'Ramón Centeno' },
  { name: 'Nelson Piñero' },
  { name: 'Ernesto Paraqueima' },
  { name: 'Eyvin Hernandez' },
  { name: 'Arianny Sanchez' },
  { name: 'Franklin Caldera' },
  { name: 'Javier Tarazona' },
  { name: 'Larry Osorio Chía' },
  { name: 'Jhonatan Rangel' },
  { name: 'Ivonne Barrios' },
  { name: 'Renny Olivares Moreno' },
  { name: 'Darwin Urdaneta' },
  { name: 'Yoslen Broadbelt' },
  { name: 'Eudis Guirott' },
  { name: 'José Acevedo Montañez' },
  { name: 'Argenis Ugueto' },
  { name: 'Robert Franco' },
  { name: 'Rigoberto Carmona' },
  { name: 'Francisco Pacheco' },
  { name: 'Nelsom Santiago' },
  { name: 'César Guevara' },
  { name: 'Jhoan Centeno' },
  { name: 'Dario Estrada' },
  { name: 'Daeven Rodriguez' },
  { name: 'Leonardo Carrillo' },
  { name: 'Eduardo Henríquez' },
  { name: 'Adolfo Baduel' },
  { name: 'John Gasparini' },
  { name: 'Jhon Jaimes' },
  { name: 'Juan Carlos Marrufo' },
  { name: 'María Auxiliadora Delgado' },
  { name: 'Jesús Castro Gómez' },
  { name: 'Hugo Carrillo' },
  { name: 'Yusimar Montilla' },
  { name: 'Geomer Martínez' },
  { name: 'Igbert Marin Chaparro' },
  { name: 'Rafael Diaz Cuello' },
  { name: 'Hector Hernández' },
  { name: 'Emirlendris Benítez' },
  { name: 'Alberto Maita' },
  { name: 'Gustavo Sandoval' },
  { name: 'Pedro Zambrano' },
  { name: 'Juan Carlos Caguaripiano' },
  { name: 'Oswaldo Castillo' },
  { name: 'Henryberth Rivas' },
  { name: 'Ángela Expósito' },
  { name: 'Franks Cabaña' },
  { name: 'Larry E. Briceño' },
  { name: 'Reggie Andrade' },
  { name: 'Fred Mavares' },
  { name: 'Alberto Polo' },
  { name: 'Roniel Farías' },
  { name: 'Giuliani Espinoza' },
  { name: 'Robert Salas' },
  { name: 'Nohemí Pabón' },
  { name: 'Carlos Jiménez Alfonso' },
  { name: 'Ruperto Sánchez' },
  { name: 'César Orta' },
  { name: 'José Gregorio Delgado' },
  { name: 'Juan Carlos Nieto' },
  { name: 'Nery Córdoba' },
  { name: 'Víctor Ascanio' },
  { name: 'María Elena Uzcátegui' },
  { name: 'Otoniel Guevara' },
  { name: 'Rolando Guevara' },
  { name: 'Luis Molina' },
  { name: 'Erasmo Bolívar' },
  { name: 'Neomar Lander' },
  { name: 'Oscar Perez' },
  { name: 'Yorman Bervecia' },
  { name: 'Walter Páez Lucena' },
  { name: 'Gabriel Ramos' },
  { name: 'Luis Eduardo Hernández' },
  { name: 'Julio Valerio García' },
  { name: 'Jesús Gregorio Tovar' },
  { name: 'Jhon Alejandro Graterol' },
  { name: 'Isaias Jacob Fuenmayor' },
  { name: 'Olinger Montaño' },
  { name: 'Antonhy Cañizález' },
  { name: 'Jeison Javier Bracho' },
  { name: 'Rancés Daniel Izarra' },
  { name: 'Carlos Porras' },
  { name: 'Jesús Ramón Medina' },
  { name: 'Gustavo Rojas' },
  { name: 'José Antonio Torres' },
  { name: 'Antonhy David Moya' },
  { name: 'Yorgenis Emiliano Leyva' },
  { name: 'Aníbal José Romero' },
  { name: 'Andrés Alfonso Ramírez' },
  { name: 'Dorian Rair Rondón' },
  { name: 'Victor Bustos' },
  { name: 'Edgar Alexander Aristeguieta' },
  { name: 'Jeison Gabriel España' },
  { name: 'Alfredo Nuñez' },
  { name: 'Augusto Sergio Puga' },
  { name: 'Adriana Urquiola' },
];

export async function GET() {
  try {
    const response = await fetch(`${process.env.SCRAPPER_URL_SITE}`);
    const data = await response.text();
    const $ = cheerio.load(data);

    const paragraphs = $(
      'p[style*="color:#fffffe;font-family:YAFdJigK8DM-0;line-height:1.32830514em;text-align:center;letter-spacing:0.03em;"]:has(span[style*="color:#fffffe;font-weight:500;"])'
    );
    const scrappedSequestered: string[] = [];
    paragraphs.each((_, elem) => {
      const content = $(elem).text();
      if (REGEX.test(content)) {
        scrappedSequestered.push(content.trim());
      }
    });

    const supabase = createClient();
    const { data: sequesteredData, error } = await supabase
      .from('sequestered')
      .select('name');

    if (!error) {
      const toBeAdded = [];

      if (scrappedSequestered.length > 0) {
        for (const sequestered of scrappedSequestered) {
          const isExist = sequesteredData?.find((s) => s?.name === sequestered);
          isExist ??
            toBeAdded.push({
              name: sequestered,
            });
        }
      } else {
        for (const sequestered of SEQUESTERED_LOCAL) {
          const isExist = sequesteredData?.find((s) => s?.name === sequestered.name);
          isExist ?? toBeAdded.push(sequestered);
        }
      }

      if (toBeAdded.length > 0) {
        const { error } = await supabase.from('sequestered').insert(toBeAdded);

        if (error) {
          throw error;
        }
      }

      return Response.json({
        message: 'Scrapper successfully executed',
      });
    }

    return Response.json(
      {
        message: 'An error occured!',
      },
      {
        status: 500,
      }
    );
  } catch (error) {
    console.error('Error scrapping:', error);
    return Response.json(
      {
        message: 'An error occured!',
      },
      {
        status: 500,
      }
    );
  }
}
