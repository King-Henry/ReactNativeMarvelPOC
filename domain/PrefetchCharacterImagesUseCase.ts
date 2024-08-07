import { ParsedCharacter } from "../data/ParsedCharacter";
import { Image } from "expo-image";



export function prefetchCharacterImagesUseCase(parsedCharacters: ParsedCharacter[]): Promise<boolean|void> {
    const urls: string[] = parsedCharacters.map<string>(parsedCharacter => parsedCharacter.thumbnailImage!)
                                .filter((url) => url !== null && url.trim())
    return Image.prefetch(urls)
        .then((success) => {
            console.log("WE FETCHED IMAGES: " + success)
            return success
        })
        .catch(error => console.log(error))
}