import type { APIRoute } from 'astro';

export const prerender = false;

const VUD_API_TOKEN = '17695301406978e31c715766978e31c715ae';
const VUD_API_URL = 'https://www.viteundevis.com/api/get.php';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Map frontend data to ViteUnDevis fields
    const postData: Record<string, string> = {
      key: VUD_API_TOKEN,
      nom: data.nom || '',
      prenom: data.prenom || '',
      email: data.email || '',
      adresse1: data.adresse || '',
      adresse2: data.adresse2 || '',
      cp: data.cp || '',
      ville: data.ville || '',
      cp_projet: data.cp_projet || data.cp || '',
      ville_projet: data.ville_projet || data.ville || '',
      pays: data.pays || 'fr',
      tel: data.tel || '',
      mobile: data.mobile || '',
      societe: data.societe || '',
      budget: data.budget ? String(data.budget) : '',
      surface: data.surface ? String(data.surface) : '',
      terrain: data.terrain ? '1' : '0',
      permis: data.permis ? String(data.permis) : '3', // 1=Yes, 2=Wait, 3=No
      tp: data.tp ? String(data.tp) : '1', // 1=Particulier, 2=Pro, etc.
      type_bien: data.type_bien ? String(data.type_bien) : '2', // 2=Maison, 1=Appart, etc.
      situation: data.situation ? String(data.situation) : '1', // 1=Proprio, etc.
      delais: data.delais ? String(data.delais) : '2', // 2=Dans les 6 mois
      description: data.description || '',
      site_name: 'cout-ravalement-facade.fr',
      format_return: 'json',
      // Preferred call hours (optional)
      matin: data.contactMatin ? '1' : '0',
      midi: data.contactMidi ? '1' : '0',
      soir: data.contactSoir ? '1' : '0',
      we: data.contactWe ? '1' : '0',
    };

    // Category ID (ID_TRAVAUX)
    // Ravalement Facade is 62. Déménagement (for test) is 145.
    postData.cat_id = data.cat_id ? String(data.cat_id) : '62';

    // Build the request body (URL-encoded format)
    const body = new URLSearchParams(postData).toString();

    // Determine target URL (allow testing on test=1 via query parameter or a flag)
    const isTest = data.isTest === true || data.cat_id === 145 || data.cat_id === '145';
    const targetUrl = isTest ? `${VUD_API_URL}?test=1` : VUD_API_URL;

    // Call ViteUnDevis API
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `partenaire-apivud-${VUD_API_TOKEN}`,
      },
      body,
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ success: false, error: 'HTTP error from ViteUnDevis API' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawResult = await response.text();
    let result;
    try {
      result = JSON.parse(rawResult);
    } catch (e) {
      // In case they returned serialized PHP or non-JSON
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid API response format', raw: rawResult }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the API returned an error status code
    const codes = result.code_retour || [];
    const successCode = codes.find((c: any) => c.code === '200' || c.code === 200);

    if (successCode) {
      return new Response(
        JSON.stringify({
          success: true,
          devis_id: result.devis_data?.devis_id,
          devis_hash: result.devis_data?.devis_hash,
          message: 'Lead registered successfully',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          errors: codes.map((c: any) => ({ code: c.code, message: c.code_texte })),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
