

import {Injectable} from '@nestjs/common';

import {AbcOrder, ModifyBO} from '../interface/service';
import {
    AbcOrderSaveRepo, CreateBody, OrderEntity,
} from '../interface/repository';
import {AbcPackageQueryRepo} from '@app/domain/package/interface/repository';
import {AbcStockQueryRepo} from '@app/domain/stock/interface/repository';
import {Left, Right} from '@app/tool/functor';
import {AbcPackage} from '@app/domain/package/interface/service';


@Injectable()
export class OrderService extends AbcOrder {

    constructor (
        private readonly saveRepo : AbcOrderSaveRepo,
        private readonly stockQuery : AbcStockQueryRepo,
        private readonly packageQuery : AbcPackageQueryRepo,
        private readonly packageService : AbcPackage,
    ) { super(); }

    async create (storage : CreateBody) : Promise<OrderEntity> {
        return this.saveRepo.save(storage);
    }

    async modify (origin : OrderEntity, modifyBO : ModifyBO) {
        const {type, status, remark, finished} = modifyBO;
        const timestamp = origin.timestamp;
        timestamp.finished = finished;
        const target = {
            ...origin, status : status || origin.status,
            type : type || origin.type,
            remark : remark || origin.remark,
            timestamp : finished ? timestamp : origin.timestamp,
        };
        return this.saveRepo.modify(target, origin);
    }

    // 落库：对应库存增加（库存是否有剩余容量）；包裹路径、状态更新；采购单状态更新
    async inStock (order : OrderEntity, back : boolean = false) {
        const package_ = await this.packageQuery.fetchOne({id : order.packageId});
        const id = back ? order.origin : order.target;
        if (!!parseInt(id)) {
            const stock = await this.stockQuery.fetchOne({id : parseInt(id)});
            if (stock.status != 'available') return Left.of(order);
        }
        await this.packageService.modify(package_, {stockId : id});
        const reuslt = await this.modify(order,
            {status : !back ? 'return' : 'finish'});
        return Right.of(reuslt);
    }

}
