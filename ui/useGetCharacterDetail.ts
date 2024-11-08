import { useEffect, useState } from "react";
import { CharacterDetailUiModel } from "../domain/CharacterDetailUiModel";
import { transformCharacterToCharacterDetailUi } from "../domain/TransformCharacterToCharacterDetailUi";
import { ModelFetchStatus, useGetCharacterForId } from "../domain/UseGetCharacterForId";

export function useGetCharacterDetail(id: number)  {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [uiModel, setUiModel] = useState<CharacterDetailUiModel | null>(null)
    const result = useGetCharacterForId(id)

    useEffect(() => {
        if (result.status === ModelFetchStatus.Error) {
            setError(true)
            setLoading(false)
            console.log('FAILL')
        } else if (result.status === ModelFetchStatus.Success) { 
            console.log('SUCCESS')
            const uiModel = transformCharacterToCharacterDetailUi(result.model!)
            setLoading(false)
            setUiModel(uiModel)
            
        }
    }, [result.status])

    return { loading, error, uiModel }
}