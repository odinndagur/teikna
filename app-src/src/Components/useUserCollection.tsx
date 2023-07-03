import { useLocalStorage } from 'usehooks-ts'

export const useUserCollection = () => {
    // const [userCollections, setUserCollections] = useLocalStorage<
    // { id: number | string; name: string; images: string[] }[]
    // >('user-collections', [{ name: 'Base', id: 1, images: [] }])
    return useLocalStorage<
        { id: number | string; name: string; images: string[] }[]
    >('user-collections', [{ name: 'Base', id: 1, images: [] }])
}
