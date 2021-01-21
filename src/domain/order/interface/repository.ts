

export interface OrderEntity {
    id : number;
    createTime : number;
    endTime ?: number;
    origin : string;
    target : string;
    packageId : number;
    type : string;
    loss ?: number;
    status : 'start' | 'processing' | 'finish' | 'returning' | 'return' | 'unusual';
    remark ?: string;
}


export interface OneQuery {
    id : number;
}

export interface ManyQuery {
    idList ?: number[];
    createTime ?: number;
    endTime ?: number;
    origin ?: string[];
    target ?: string[];
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
    loss ?: number;
    status : 'start' | 'processing' | 'finish' | 'returning' | 'return' | 'unusual';
    remark ?: string;
}

export abstract class AbcOrderSaveRepo {

    abstract save (body : CreateBody) : Promise<OrderEntity>;

    abstract modify (target : OrderEntity, origin : OrderEntity) :
    Promise<OrderEntity>;

}
