export enum UnitType {
    standard = 'standard',
    american = 'american',
    fraction = 'fraction'
}

export enum MetricLabel {
    tf = 'tf',
    r = 'r',
    d = 'd',
    bf = 'bf',
    tw = 'tw',
    area = 'area',
    weight = 'weight'
}

export interface Metric {
    standard: number;
    american?: number;
}

export interface PerfilData {
    d: number;
    bf: number;
    tw: number;
    tf: number;
    r: number;
    area: number;
    weight: number;
    _id: string;
}

export interface PerfilRawData {
    d: Metric;
    bf: Metric;
    tw: Metric;
    tf: Metric;
    r: Metric;
    area: Metric;
    weight: Metric;
    _id: string;
}


export interface Coordinate {
    x: number;
    y: number;
}

export interface PerfilSVG {
    width: number;
    heigth: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
    x5: number;
    y5: number;
    x6: number;
    y6: number;
    x7: number;
    y7: number;
    x8: number;
    y8: number;
    x9: number;
    y9: number;
    x10: number;
    y10: number;
    x11: number;
    y11: number;
    x12: number;
    y12: number;
    x13: number;
    y13: number;
    x14: number;
    y14: number;
    x15: number;
    y15: number;
}
