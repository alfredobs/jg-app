import { Model, Query, Types } from 'mongoose';
import { forOwn, isEmpty } from 'lodash';
import { MongooseQueryParser } from 'mongoose-query-parser';
import { ParsedQs } from 'qs';
//import { MongooseQueryParser } from 'mongoose-query-parser';

export interface IDocByQueryRes<T = Document> {
  data: T[] | number;
}
export interface IDocByQueryRes<T = Document> {
  data: T[] | number;
}
export class QueryParser {
  static async docByQuery<T = any>(
    model: Model<any>,
    query: ParsedQs,
    count = false,
  ): Promise<IDocByQueryRes<T>> {
    // Query variables
    let docsQuery: Query<any, any>;
    let countQueryDocuments: Query<any, any> | null;

    docsQuery = model.find({});
    countQueryDocuments = count ? model.countDocuments() : null;

    if (!isEmpty(query)) {
      const parser = new MongooseQueryParser();
      const queryParams = parser.parse(query);
      forOwn(queryParams.filter, (value, key) => {
        docsQuery = docsQuery.where(
          key,
          Types.ObjectId.isValid(value as any)
            ? new Types.ObjectId(value as any)
            : value,
        );

        if (countQueryDocuments)
          countQueryDocuments = countQueryDocuments.where(
            key,
            Types.ObjectId.isValid(value as any)
              ? new Types.ObjectId(value as any)
              : value,
          );
      });
      if (queryParams.populate)
        docsQuery = docsQuery.populate(queryParams.populate);

      if (queryParams.sort) docsQuery = docsQuery.sort(queryParams.sort);
      if (queryParams.limit) docsQuery = docsQuery.limit(queryParams.limit);
      if (queryParams.select) docsQuery = docsQuery.select(queryParams.select);
      if (queryParams.skip) docsQuery = docsQuery.skip(queryParams.skip);
    }

    try {
      return {
        data:
          count && countQueryDocuments
            ? await countQueryDocuments.exec()
            : await docsQuery.exec(),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
