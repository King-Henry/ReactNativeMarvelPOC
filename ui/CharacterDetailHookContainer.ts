import { useGetCharacterDetail } from "./useGetCharacterDetail"


export const useCharacterDetailHookContainer = (id: number) => {
    const { loading, error, uiModel } = useGetCharacterDetail(id)
    return { loading, error, uiModel }
}