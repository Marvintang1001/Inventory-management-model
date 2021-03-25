

import {Timestamp} from '@app/core/repository';


export interface OrderEntity {
    id : number;
    timestamp : Timestamp;
    origin : string;
    target : string;
    packageId : number;
    type : string;  // 区分采购、调货、出货
    status : 'process' | 'finish' | 'return' | 'unusual';
    remark ?: string;
}


export interface OneQuery {
    id : number;
}

export interface ManyQuery {
    idList ?: number[];
    created ?: number;
    finished ?: number;
    origin ?: (number|string)[];
    target ?: (number|string)[];
    packageId ?: number[];
    status ?: string[];
}


export abstract class AbcOrderQueryRepo {

    abstract fetchOne (query : OneQuery) : Promise<OrderEntity | undefined>;

    abstract fetchMany (query : ManyQuery) :  Promise<OrderEntity[]>;

}


export interface CreateBody {
    origin : string;
    target : string;
    packageId : number;
    type : string;
    status : 'process' | 'finish' | 'return' | 'unusual';
    remark ?: string;
}

export abstract class AbcOrderSaveRepo {

    abstract save (body : CreateBody) : Promise<OrderEntity>;

    abstract modify (target : OrderEntity, origin : OrderEntity) :
    Promise<OrderEntity>;

}

