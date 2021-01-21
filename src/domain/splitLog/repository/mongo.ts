

import {Entity, Column} from 'typeorm';

import {MongoModel} from '@app/core/repository';


@Entity({name : 'splitLog'})
export class SplitLogModel extends MongoModel {

    @Column() origin : number[];

    @Column() end : number[];

}
