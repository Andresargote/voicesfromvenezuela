import { createClient } from '@/src/utils/supabase/server';
import * as cheerio from 'cheerio';

const REGEX = /^[^0-9]+$/;

export async function GET() {
  try {
    const response = await fetch(`https://vzlalibre.my.canva.site/vzlalibre#page-2`);
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

      for (const sequestered of scrappedSequestered) {
        const isExist = sequesteredData?.find((s) => s?.name === sequestered);
        isExist ??
          toBeAdded.push({
            name: sequestered,
          });
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
