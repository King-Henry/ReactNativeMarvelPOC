import {ParsedCharacter} from '../data/ParsedCharacter';

const imageLinks: string[] = [
  'https://images.freeimages.com/fic/images/icons/1275/naruto_vol_1/256/uzumaki_naruto.png',
  'https://at-cdn-s01.audiotool.com/2016/01/31/documents/QFwYQesK7nAPOfXkPB6TUBOMEsLKVGu/0/cover256x256-5dfabab347344e9a912acc891294f71f.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBRcmcUSsOfLp1Wgy2kOD5B2InPzUpH8zGg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIr8Np9UOTpHWzK725fVkeMn7YSEo1_Ovl4A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBe9e2tBVZ0EA5C0ns-dBR63qfGD6NRWBgZQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdDpEpLQQRvrpUinH3wsS2TWEglGTx_eOvg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLboWYFnjXoEBXQOEsXXxiBDXP-k4N_DUYpA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBRcmcUSsOfLp1Wgy2kOD5B2InPzUpH8zGg&s',
  'https://qph.cf2.quoracdn.net/main-qimg-c19f38441f8aa3076db0243c1d1c5588-pjlq',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIr8Np9UOTpHWzK725fVkeMn7YSEo1_Ovl4A&s',
];

function randomNumber(): number {
  return Math.floor(Math.random() * 10);
}

// need interface for rawCharacter
export function parseJsonForCharacterUseCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawCharacter: any,
): ParsedCharacter {
  const characterId: number = rawCharacter.id;
  const characterName: string = rawCharacter.name;
  const characterImage: string = rawCharacter.images[0] ?? null;

  return {
    id: characterId,
    name: characterName,
    fullImage: characterImage,
    thumbnailImage: imageLinks[randomNumber()]!,
  };
}

export {};
