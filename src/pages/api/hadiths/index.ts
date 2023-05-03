import { NextApiRequest, NextApiResponse } from 'next'
import { abuDaud, ahmad, bukhari, darimi, ibnuMajah, malik, muslim, nasai, tirmidzi } from '../../../data/hadiths'

interface Hadith {
    number: number,
    arab: string,
    id: string
}

interface Data {
    next: {
        page: number,
        limit: number
    } | null,
    previous: {
        page: number,
        limit: number
    } | null,
    results: Hadith[],
    success: boolean | true,
    messages: string
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let results: Data = {
        next: null,
        previous: null,
        results: [],
        success: false,
        messages: 'unknown rowi!'
    }

    let rowi = getRowi(req.query.rowi as string)
    if (rowi.length == 0) {
        return res.status(404).json(results)
    }

    const data: Hadith[] = rowi
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        }
    }

    results.results = data.slice(startIndex, endIndex)
    results.success = true
    results.messages = 'Success retrieve data!'

    res.status(200).json(results)
}

function getRowi(name: string) :Hadith[] {
    switch (name) {
        case 'abu-daud': {
            return abuDaud as Hadith[]
            break
        }
        case 'ahmad': {
            return ahmad as Hadith[]
            break
        }
        case 'bukhari': {
            return bukhari as Hadith[]
            break
        }
        case 'darimi': {
            return darimi as Hadith[]
            break
        }
        case 'ibnu-majah': {
            return ibnuMajah as Hadith[]
            break
        }
        case 'malik': {
            return malik as Hadith[]
            break
        }
        case 'muslim': {
            return muslim as Hadith[]
            break
        }
        case 'nasai': {
            return nasai as Hadith[]
            break
        }
        case 'tirmidzi': {
            return tirmidzi as Hadith[]
            break
        }
        default: {
            return []
            break
        }
    }
}
