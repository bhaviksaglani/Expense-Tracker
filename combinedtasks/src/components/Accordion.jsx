import React, { useState, useContext } from 'react'
import Transaction from './Transaction'
import { dateGrouping } from '../helper/reUsableFunctions'
import { GlobalContext } from '../context/GlobalState'
import useFirestore from '../hooks/useFirestore';

const Accordion = () => {
    const [ActiveIndex, setActiveIndex] = useState(null)
    const { transactions } = useContext(GlobalContext);

    const { docs } = useFirestore('transactions');

    // Grouping same date Data
    const allTransactionsArray = dateGrouping(transactions)
    const onlineTransactionArray = dateGrouping(docs);
    // console.log(onlineTransactionArray)
    // console.log(allTransactionsArray)


    // Sorting data based on date
    
        const sortType = 'asc';
       const sorted = docs.sort((a, b) => {
            const isSorted = (sortType === 'asc') ? 1 : -1
            return isSorted * b.date.localeCompare(a.date)
        })
   

    
    const handleClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <div>
            {/* {
                allTransactionsArray.map((transaction, index) => {
                    const active = index === ActiveIndex ? 'active' : '';
                    return (
                        <div className="ui styled accordion" key={transaction.id}>
                            <div className={`title ${active}`} onClick={() => handleClick(index)}>
                                <i className="dropdown icon"></i>
                                {transaction.date}
                                <span className="total-value"  >{transaction.total}</span>
                            </div>
                            <div className={`content ${active}`}>
                                {
                                    transaction.items.map((item) => <p><Transaction key={item.id} transaction={item} /></p>)
                                }

                            </div>
                        </div>
                    )
                })
            } */}
             {
               onlineTransactionArray.map((transaction, index) => {
                //    console.log(transcation)
                    const active = index === ActiveIndex ? 'active' : '';
                    return (
                        <div className="ui styled accordion" key={transaction.id}>
                            <div className={`title ${active}`} onClick={() => handleClick(index)}>
                                <i className="dropdown icon"></i>
                                {transaction.date}
                                <span className="total-value"  >{transaction.total}</span>
                            </div>
                            <div className={`content ${active}`}>
                                {
                                    transaction.items.map((item) => <p><Transaction key={item.id} transaction={item} /></p>)
                                }

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Accordion
