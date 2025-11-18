const svg_names = [
  "discord",
  "facebook",
  "fb-messenger",
  "github",
  "instagram",
  "linkedin",
  "pinterest",
  "reddit",
  "snapchat",
  "telegram",
  "tiktok",
  "twitch",
  "twitter",
  "whatsapp",
  "youtube"
];

const svgs = svg_names.map(name => ({
  id: `${name}_svg`,
  svgpath: `./svgs/${name}.svg`
}));

const loadSvgs = async () => {
  const promises = svg_names.map(async (name) => {
    const module = await import(`./svgs/${name}.svg`);
    return {
      id: `${name}_svg`,
      src: module.default,
    };
  });

  return Promise.all(promises);
};

const loadDefaultSvg = async () => {
    const DEFAULT_SVG = await import('./svgs/circle-minus.svg');
    return DEFAULT_SVG.default;
}

const shuffleArray = (arr) => {
    const copy = [...arr];
    for(let i = copy.length - 1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export { loadSvgs, shuffleArray, loadDefaultSvg };
