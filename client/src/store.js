import create from 'zustand'

const useStore = create(set => ({
  csv: "",
  addCsv: (file) => set(state => ({ csv: file })),
  showResults: false,
  showState: (setState) => set(state => ({showResults:setState})),
  srcList: [],
  addSrc: (array) => set(state => ({ srcList: array})),
  twitterList: {},
  addTwitterList: (obj) => set(state => ({ twitterList: obj})),
  tikTokCard: {},
  addtikTokCard: (obj) => set(state => ({ tikTokCard: obj}))
}))

export default useStore;