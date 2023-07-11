import { ServerRespond } from './DataStreamer';

export interface Row {
//forced to user this to 'convert the row into a string'
//found on https://github.com/insidesherpa/JPMC-tech-task-3-PY3/issues/94
[key: string] : string|any
  price_abc: number,
  price_def: number,
  ratio: number
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
       //calculating stock price of ABC
       const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) /2;
       //calculating stock price of DEF
       const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) /2;
       //calculating ratio between the two stocks:
       const ratio = priceABC / priceDEF;
       const upperBound = 1 + 0.05;
       const lowerBound = 1 - 0.05;
       return {
       //assigning the calculated values to the necessary return values detailed by class Row
        price_abc: priceABC,
        price_def: priceDEF,
        ratio: ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
            serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
       };
  }
}
