export class Diamond {

    constructor(
        public name: string = '',
        public collection: string = '',
        public price: Number = 0,
        public imgUrl: string = '',
        public _id?: string,
        ) {

    }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}

export interface DiamondFilter {
    term: string
}