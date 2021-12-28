import { formatThousands } from "./utils";

function KeyStatistics({stockStats}){
    function formatMarketCap(number){
        let numLength = number.toString().length
        let numDescriptor;
        if (numLength <= 6) numDescriptor = formatThousands(number)
        if (numLength > 6 && numLength < 10) numDescriptor = `${formatThousands(number).split(',')[0]}M`
        if (numLength > 9 && numLength < 13) numDescriptor = `${formatThousands(number).split(',')[0]}.${formatThousands(number).split(',')[1].slice(0, 2)}B`
        if (numLength > 12) numDescriptor = `${formatThousands(number).split(',')[0]}.${formatThousands(number).split(',')[1].slice(0, 2)}T`
        return numDescriptor
    }

    return (
        <div className="key-stat-container">
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Market Cap</p>
                <p className='key-stat'>{stockStats.marketCap ? formatMarketCap(stockStats.marketCap) : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Price-Earnings Ratio</p>
                <p className='key-stat'>{stockStats.PERatio ? stockStats.PERatio : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Dividend Yield</p>
                <p className='key-stat'>{stockStats.dividendYield ? stockStats.dividendYield : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>52 Week High</p>
                <p className='key-stat'>{stockStats['52weekHigh'] ? stockStats['52weekHigh'] : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>52 Week Low</p>
                <p className='key-stat'>{stockStats['52weekLow'] ? stockStats['52weekLow'] : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>High Today</p>
                <p className='key-stat'>{stockStats.highToday ? stockStats.highToday : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Low Today</p>
                <p className='key-stat'>{stockStats.lowToday ? stockStats.lowToday : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Open Price</p>
                <p className='key-stat'>{stockStats.openPrice ? stockStats.openPrice : '-'}</p>
            </div>
            <div className='key-stat-pair'>
                <p className='key-stat-title'>Previous Close</p>
                <p className='key-stat'>{stockStats.previousClose ? stockStats.previousClose : '-'}</p>
            </div>
        </div>
    );
};

export default KeyStatistics  