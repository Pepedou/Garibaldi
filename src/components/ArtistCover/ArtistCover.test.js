import ArtistCover from './ArtistCover'

describe('ArtistCover', () => {
    it('Can be required', () => {
        expect(ArtistCover).toBeDefined()
        expect(ArtistCover).toBeInstanceOf(Function)
    })

    it('Can be instanziated', () => {
        let instance = ArtistCover({artist:{image:'', name:''}});
        console.log(instance)
    })
})