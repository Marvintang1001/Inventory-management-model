

import {Entity, Column} from 'typeorm';

import {PostgresModel} from '@app/core/repository';


@Entity({name : 'order1'})
export class OrderModel extends PostgresModel {

    @Column({name : 'packageid'}) packageId : number;

    @Column() origin : string;

    @Column() target : string;

    @Column() type : string;

    @Column({nullable : true}) remark ?: string;

    @Column()
    status : 'process' | 'finish' | 'unusual';

}
