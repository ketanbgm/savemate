import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
const NAMESPACE = 'Merchants';

const createMerchant = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting Merchant');

    let { name, description, cashback, slug, merchant_redirection_url, country } = req.body;

    let query = `INSERT INTO merchant(name, description, cashback, slug, merchant_redirection_url, country)
                 VALUES ('${name}','${description}',${cashback},'${slug}','${merchant_redirection_url}','${country}')`;
    if(!name){
        return res.status(403).json({
            success :false,
            message : "Merchant name is required"
        });
    }else if(!cashback || typeof(cashback) == 'string'){
        return res.status(403).json({
            success :false,
            message : "Invalid cashback"
        });
    }
    else if(!description){
        return res.status(403).json({
            success :false,
            message : "Description is required"
        });
    } else if(!country){
        return res.status(403).json({
            success :false,
            message : "Country is required"
        });
    }else if(!slug){
        return res.status(403).json({
            success :false,
            message : "Slug is required"
        });
    } else if(!merchant_redirection_url){
        return res.status(403).json({
            success :false,
            message : "Merchant Redirect url is required"
        });
    }else {
        Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Merchant created');

                    return res.status(200).json({
                        success :true,
                        message : "Merchant Added successfully",
                        result : result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        success :false
                    });
                })
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                success :false
            });
        });
    } 
};

const getAllMerchant = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Merchants.');
    let getId = req.params.id;
    let numRows : any;
    let responsePayload = <any> {};
    let numPerPage: any = req.query.npp || 10;
    let page:any = req.query.page || 1;
    let numPages : any;
    page = page - 1;
    let skip = page * numPerPage;
    let limit = skip + ',' + numPerPage;
    let orderBy:any = req.query.orderBy || 1;
    let orderQuery = ``;
    let getQuery = getId ? `WHERE id = ${getId} `: ``
    let cntQuery =`select count(*) as numRows FROM merchant ${getQuery}`;

    Connect()
        .then((connection) => {
            Query(connection, cntQuery)
                .then((cntResult :any) => {
                    logging.info(NAMESPACE, 'Count Merchants: ');
                    if(cntResult[0].numRows > 0){
                        numRows = cntResult[0].numRows;
                        numPages = Math.ceil(numRows / numPerPage);
                        orderQuery = orderBy == 1 ? `order by id asc` : `order by id desc`
                        let query = `SELECT NAME,
                                            description,
                                            cashback,
                                            slug,
                                            merchant_redirection_url,
                                            country,
                                            (
                                                CASE 
                                                WHEN cashback BETWEEN 0 AND 4 THEN 50
                                                WHEN cashback BETWEEN 5 AND 9 THEN 40
                                                WHEN cashback BETWEEN 10 AND 14 THEN 30
                                                WHEN cashback >=15 THEN 20
                                            END
                                        ) AS cashbackRate
                                        FROM
                                            merchant ${orderQuery} LIMIT ${limit} `;
                        Query(connection, query)
                        .then((results) => {
                            logging.info(NAMESPACE, 'Retrieved Merchants: ');
                            responsePayload.result = results
                            if (page < numPages) {
                                responsePayload.pagination = {
                                  total : numRows,
                                  current: page + 1,
                                  perPage: numPerPage,
                                  previous: page > 0 ? page : undefined,
                                  next: page + 1 < numPages ? page + 2 : undefined
                                }
                              }
                              else {
                                  responsePayload.pagination = {
                                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                                 }
                            }
                            return res.status(200).json({
                                message : "Success",
                                results : responsePayload
                            });
                        })
                        .catch((error) => {
                            logging.error(NAMESPACE, error.message, error);
                            return res.status(200).json({
                                message: error.message,
                                result : error
                            });
                        })
                        
                    }else {
                        return res.status(200).json({message : "No data found",result : []});
                    }      
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        result : error
                    });
                })
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                result : error
            });
        });
        
};

export default { createMerchant, getAllMerchant };
