export function getEmbedUrl(slug: string, campaign?: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://lupinleads.com";
  const url = new URL(`${base}/embed/${slug}`);
  if (campaign) url.searchParams.set("campaign", campaign);
  return url.toString();
}

export function generateIframeEmbed(slug: string, campaign?: string): string {
  const src = getEmbedUrl(slug, campaign);
  return `<iframe
  src="${src}"
  width="100%"
  height="560"
  frameborder="0"
  style="border:0;border-radius:8px;max-width:480px;"
  title="Lead capture form"
></iframe>`;
}

export function generateScriptEmbed(slug: string, campaign?: string): string {
  const src = getEmbedUrl(slug, campaign);
  return `<!-- LUPIN LEADS Capture Form -->
<div id="lupin-form-${slug}"></div>
<script>
(function(){
  var c=document.getElementById("lupin-form-${slug}");
  var f=document.createElement("iframe");
  f.src="${src}";
  f.width="100%";
  f.height="560";
  f.frameBorder="0";
  f.style.cssText="border:0;border-radius:8px;max-width:480px;";
  f.title="Lead capture form";
  c.appendChild(f);
})();
</script>`;
}

export function generateDirectLink(slug: string, campaign?: string): string {
  return getEmbedUrl(slug, campaign);
}

export function generateCampaignLink(slug: string, campaign: string, utmSource?: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://lupinleads.com";
  const url = new URL(`${base}/embed/${slug}`);
  url.searchParams.set("campaign", campaign);
  url.searchParams.set("utm_campaign", campaign);
  if (utmSource) url.searchParams.set("utm_source", utmSource);
  return url.toString();
}
