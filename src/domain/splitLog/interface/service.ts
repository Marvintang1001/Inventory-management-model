/**
 * 拆分日志服务
 */

import {SplitLogEntity, CreateBody} from './repository';


export abstract class AbcSplitLog {

    abstract create (CreateBody : CreateBody) : Promise<string>;

}