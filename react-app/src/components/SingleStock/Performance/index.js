import { formatThousands } from "../StockStats/utils";  


function Performance ({currentPrice, stockStats, assets, ticker}) {

    const percentageDifference = (originalPrice, currentPrice) => {
        const percentageDiff = ((currentPrice - originalPrice) / originalPrice) * 100;
        if (!percentageDiff.toString().startsWith("-")) {
          return "+" + Number(percentageDiff.toFixed(2));
        } else {
          return Number(percentageDiff.toFixed(2)).toString();
        }
      };
      
     function marketValue(price, shares) {
        const value = price * shares;
        return `$${formatThousands(value.toFixed(2))}`;
      }
      
      function todaysReturn(open, current) {
        const value = Number((current - open).toFixed(2));
        let formattedValue = {
          "%": percentageDifference(open, current),
          return: null,
        };
      
        value >= 0
          ? (formattedValue["return"] = `+$${formatThousands(value)}`)
          : (formattedValue["return"] = `-$${formatThousands(value.toString().slice(1))}`);
      
        return formattedValue;
      }
      
      function totalReturn(avg, shares, price) {
        const spent = Number((avg * shares).toFixed(2));
        const mktValue = Number(marketValue(price, shares).slice(1).split(',').join(''));
        const totalReturn = mktValue - spent;
        
        let formattedReturn = {
          "%": percentageDifference(spent, mktValue),
          return: null,
        };
        
        totalReturn >= 0
        ? (formattedReturn["return"] = `+$${formatThousands(totalReturn.toFixed(2))}`)
        : (formattedReturn["return"] = `-$${formatThousands(totalReturn
          .toFixed(2)
          .toString()
          .slice(1))}`);
          
        return formattedReturn;
      }
      
      function portfolioDiversity(assets, shares) {
        let count = 0;
        for (let asset in assets) {
          if (assets[asset].shares) {
            count += Number(assets[asset].shares);
          }
        }
        let diversityNum = ((shares / count) * 100).toFixed(2);
        return `${diversityNum}%`;
      }

      const marketValueData = marketValue(currentPrice?.price, assets[ticker]?.shares)
      const todaysReturnData = todaysReturn(stockStats?.openPrice, currentPrice?.price)
      const totalReturnData = totalReturn(assets[ticker]?.average, assets[ticker]?.shares, currentPrice?.price)
      const pdData = portfolioDiversity(assets, assets[ticker]?.shares)  
 
      return (
        <> 
            {assets[ticker] &&
                <div className='ua-container'>
                    <div className='ua-left-wrapper'>
                        <div className='ua-box-header'>
                            <p className='ua-title'>Your Market Value</p>
                            <p className='ua-value'>{marketValueData}</p>
                        </div>
                        <div className='ua-section ua-border'>
                            <p>Today's Return</p>
                            <div className='ua-inner-section'>
                                <p className='return-title' >{todaysReturnData['return']}</p>
                                <p>({todaysReturnData['%']}%)</p>
                            </div>
                        </div>
                        <div className='ua-section'>
                            <p>Total Return</p>
                            <div className='ua-inner-section'>
                                <p>{totalReturnData['return']}</p>
                                <p>({totalReturnData['%']}%)</p>
                            </div>
                        </div>
                    </div>
                    <div className='ua-right-wrapper'>
                        <div>
                            <div className='ua-box-header'>
                                <p className='ua-title'>Your Average Cost</p>
                                <p className='ua-value'>${assets[ticker].average.toFixed(2)}</p>
                            </div>
                            <div className='ua-section ua-border'>
                                <p>Shares</p>
                                <p>{assets[ticker].shares}</p>
                            </div>
                            <div className='ua-section'>
                                <p>Portfolio Diversity</p>
                                <p>{pdData}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Performance