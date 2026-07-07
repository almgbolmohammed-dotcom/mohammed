import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AccountsSummary, Car, CarActivityItem, CarPhotos, CompleteRentalBody, CompleteRentalResponse, Contract, CreateCarBody, CreateExpenseBody, CreateMaintenanceBody, CreateRentalBody, CreateReservationBody, DashboardSummary, DebtRecord, DeleteCar200, DeleteCarActivity200, DeleteCarActivityParams, DeleteDebt200, DeleteExpense200, DeleteIncome200, DeleteMaintenance200, DeleteReservation200, Expense, GetAccountsSummaryParams, GetCarActivityParams, HealthStatus, IncomeRecord, ListExpensesParams, ListIncomeParams, ListMaintenanceParams, ListRentalsParams, ListReservationsParams, MaintenanceRecord, MonthlyReport, Rental, Reservation, UpdateCarPhotosBody, UpdateMaintenanceBody, UpdateRentalRateBody, UpdateReservationBody, UpsertContractBody, UpsertMonthlyReportBody } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListCarsUrl: () => string;
/**
 * @summary List all cars
 */
export declare const listCars: (options?: RequestInit) => Promise<Car[]>;
export declare const getListCarsQueryKey: () => readonly ["/api/cars"];
export declare const getListCarsQueryOptions: <TData = Awaited<ReturnType<typeof listCars>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCars>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCars>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCarsQueryResult = NonNullable<Awaited<ReturnType<typeof listCars>>>;
export type ListCarsQueryError = ErrorType<unknown>;
/**
 * @summary List all cars
 */
export declare function useListCars<TData = Awaited<ReturnType<typeof listCars>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCars>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateCarUrl: () => string;
/**
 * @summary Add a new car
 */
export declare const createCar: (createCarBody: CreateCarBody, options?: RequestInit) => Promise<Car>;
export declare const getCreateCarMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCar>>, TError, {
        data: BodyType<CreateCarBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCar>>, TError, {
    data: BodyType<CreateCarBody>;
}, TContext>;
export type CreateCarMutationResult = NonNullable<Awaited<ReturnType<typeof createCar>>>;
export type CreateCarMutationBody = BodyType<CreateCarBody>;
export type CreateCarMutationError = ErrorType<unknown>;
/**
* @summary Add a new car
*/
export declare const useCreateCar: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCar>>, TError, {
        data: BodyType<CreateCarBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCar>>, TError, {
    data: BodyType<CreateCarBody>;
}, TContext>;
export declare const getGetCarUrl: (id: number) => string;
/**
 * @summary Get car by id
 */
export declare const getCar: (id: number, options?: RequestInit) => Promise<Car>;
export declare const getGetCarQueryKey: (id: number) => readonly [`/api/cars/${number}`];
export declare const getGetCarQueryOptions: <TData = Awaited<ReturnType<typeof getCar>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCar>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCar>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCarQueryResult = NonNullable<Awaited<ReturnType<typeof getCar>>>;
export type GetCarQueryError = ErrorType<unknown>;
/**
 * @summary Get car by id
 */
export declare function useGetCar<TData = Awaited<ReturnType<typeof getCar>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCar>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateCarUrl: (id: number) => string;
/**
 * @summary Update car
 */
export declare const updateCar: (id: number, createCarBody: CreateCarBody, options?: RequestInit) => Promise<Car>;
export declare const getUpdateCarMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCar>>, TError, {
        id: number;
        data: BodyType<CreateCarBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCar>>, TError, {
    id: number;
    data: BodyType<CreateCarBody>;
}, TContext>;
export type UpdateCarMutationResult = NonNullable<Awaited<ReturnType<typeof updateCar>>>;
export type UpdateCarMutationBody = BodyType<CreateCarBody>;
export type UpdateCarMutationError = ErrorType<unknown>;
/**
* @summary Update car
*/
export declare const useUpdateCar: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCar>>, TError, {
        id: number;
        data: BodyType<CreateCarBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCar>>, TError, {
    id: number;
    data: BodyType<CreateCarBody>;
}, TContext>;
export declare const getDeleteCarUrl: (id: number) => string;
/**
 * @summary Delete car
 */
export declare const deleteCar: (id: number, options?: RequestInit) => Promise<DeleteCar200>;
export declare const getDeleteCarMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCar>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCar>>, TError, {
    id: number;
}, TContext>;
export type DeleteCarMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCar>>>;
export type DeleteCarMutationError = ErrorType<unknown>;
/**
* @summary Delete car
*/
export declare const useDeleteCar: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCar>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCar>>, TError, {
    id: number;
}, TContext>;
export declare const getGetCarActivityUrl: (id: number, params?: GetCarActivityParams) => string;
/**
 * @summary Get rental activity history for a car
 */
export declare const getCarActivity: (id: number, params?: GetCarActivityParams, options?: RequestInit) => Promise<CarActivityItem[]>;
export declare const getGetCarActivityQueryKey: (id: number, params?: GetCarActivityParams) => readonly [`/api/cars/${number}/activity`, ...GetCarActivityParams[]];
export declare const getGetCarActivityQueryOptions: <TData = Awaited<ReturnType<typeof getCarActivity>>, TError = ErrorType<unknown>>(id: number, params?: GetCarActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCarActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCarActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCarActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getCarActivity>>>;
export type GetCarActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get rental activity history for a car
 */
export declare function useGetCarActivity<TData = Awaited<ReturnType<typeof getCarActivity>>, TError = ErrorType<unknown>>(id: number, params?: GetCarActivityParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCarActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteCarActivityUrl: (id: number, activityId: number, params: DeleteCarActivityParams) => string;
/**
 * @summary Delete a car activity record (income or debt)
 */
export declare const deleteCarActivity: (id: number, activityId: number, params: DeleteCarActivityParams, options?: RequestInit) => Promise<DeleteCarActivity200>;
export declare const getDeleteCarActivityMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCarActivity>>, TError, {
        id: number;
        activityId: number;
        params: DeleteCarActivityParams;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCarActivity>>, TError, {
    id: number;
    activityId: number;
    params: DeleteCarActivityParams;
}, TContext>;
export type DeleteCarActivityMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCarActivity>>>;
export type DeleteCarActivityMutationError = ErrorType<unknown>;
/**
* @summary Delete a car activity record (income or debt)
*/
export declare const useDeleteCarActivity: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCarActivity>>, TError, {
        id: number;
        activityId: number;
        params: DeleteCarActivityParams;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCarActivity>>, TError, {
    id: number;
    activityId: number;
    params: DeleteCarActivityParams;
}, TContext>;
export declare const getListRentalsUrl: (params?: ListRentalsParams) => string;
/**
 * @summary List rentals
 */
export declare const listRentals: (params?: ListRentalsParams, options?: RequestInit) => Promise<Rental[]>;
export declare const getListRentalsQueryKey: (params?: ListRentalsParams) => readonly ["/api/rentals", ...ListRentalsParams[]];
export declare const getListRentalsQueryOptions: <TData = Awaited<ReturnType<typeof listRentals>>, TError = ErrorType<unknown>>(params?: ListRentalsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRentals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listRentals>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListRentalsQueryResult = NonNullable<Awaited<ReturnType<typeof listRentals>>>;
export type ListRentalsQueryError = ErrorType<unknown>;
/**
 * @summary List rentals
 */
export declare function useListRentals<TData = Awaited<ReturnType<typeof listRentals>>, TError = ErrorType<unknown>>(params?: ListRentalsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRentals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateRentalUrl: () => string;
/**
 * @summary Start a new rental
 */
export declare const createRental: (createRentalBody: CreateRentalBody, options?: RequestInit) => Promise<Rental>;
export declare const getCreateRentalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createRental>>, TError, {
        data: BodyType<CreateRentalBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createRental>>, TError, {
    data: BodyType<CreateRentalBody>;
}, TContext>;
export type CreateRentalMutationResult = NonNullable<Awaited<ReturnType<typeof createRental>>>;
export type CreateRentalMutationBody = BodyType<CreateRentalBody>;
export type CreateRentalMutationError = ErrorType<unknown>;
/**
* @summary Start a new rental
*/
export declare const useCreateRental: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createRental>>, TError, {
        data: BodyType<CreateRentalBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createRental>>, TError, {
    data: BodyType<CreateRentalBody>;
}, TContext>;
export declare const getGetRentalUrl: (id: number) => string;
/**
 * @summary Get rental by id
 */
export declare const getRental: (id: number, options?: RequestInit) => Promise<Rental>;
export declare const getGetRentalQueryKey: (id: number) => readonly [`/api/rentals/${number}`];
export declare const getGetRentalQueryOptions: <TData = Awaited<ReturnType<typeof getRental>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRental>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRental>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRentalQueryResult = NonNullable<Awaited<ReturnType<typeof getRental>>>;
export type GetRentalQueryError = ErrorType<unknown>;
/**
 * @summary Get rental by id
 */
export declare function useGetRental<TData = Awaited<ReturnType<typeof getRental>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRental>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateRentalRateUrl: (id: number) => string;
/**
 * @summary Update rental rate and zone mid-trip
 */
export declare const updateRentalRate: (id: number, updateRentalRateBody: UpdateRentalRateBody, options?: RequestInit) => Promise<Rental>;
export declare const getUpdateRentalRateMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateRentalRate>>, TError, {
        id: number;
        data: BodyType<UpdateRentalRateBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateRentalRate>>, TError, {
    id: number;
    data: BodyType<UpdateRentalRateBody>;
}, TContext>;
export type UpdateRentalRateMutationResult = NonNullable<Awaited<ReturnType<typeof updateRentalRate>>>;
export type UpdateRentalRateMutationBody = BodyType<UpdateRentalRateBody>;
export type UpdateRentalRateMutationError = ErrorType<unknown>;
/**
* @summary Update rental rate and zone mid-trip
*/
export declare const useUpdateRentalRate: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateRentalRate>>, TError, {
        id: number;
        data: BodyType<UpdateRentalRateBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateRentalRate>>, TError, {
    id: number;
    data: BodyType<UpdateRentalRateBody>;
}, TContext>;
export declare const getCompleteRentalUrl: (id: number) => string;
/**
 * @summary Complete a rental (mark as paid or debt)
 */
export declare const completeRental: (id: number, completeRentalBody: CompleteRentalBody, options?: RequestInit) => Promise<CompleteRentalResponse>;
export declare const getCompleteRentalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof completeRental>>, TError, {
        id: number;
        data: BodyType<CompleteRentalBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof completeRental>>, TError, {
    id: number;
    data: BodyType<CompleteRentalBody>;
}, TContext>;
export type CompleteRentalMutationResult = NonNullable<Awaited<ReturnType<typeof completeRental>>>;
export type CompleteRentalMutationBody = BodyType<CompleteRentalBody>;
export type CompleteRentalMutationError = ErrorType<unknown>;
/**
* @summary Complete a rental (mark as paid or debt)
*/
export declare const useCompleteRental: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof completeRental>>, TError, {
        id: number;
        data: BodyType<CompleteRentalBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof completeRental>>, TError, {
    id: number;
    data: BodyType<CompleteRentalBody>;
}, TContext>;
export declare const getListIncomeUrl: (params?: ListIncomeParams) => string;
/**
 * @summary List income records
 */
export declare const listIncome: (params?: ListIncomeParams, options?: RequestInit) => Promise<IncomeRecord[]>;
export declare const getListIncomeQueryKey: (params?: ListIncomeParams) => readonly ["/api/income", ...ListIncomeParams[]];
export declare const getListIncomeQueryOptions: <TData = Awaited<ReturnType<typeof listIncome>>, TError = ErrorType<unknown>>(params?: ListIncomeParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIncome>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listIncome>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListIncomeQueryResult = NonNullable<Awaited<ReturnType<typeof listIncome>>>;
export type ListIncomeQueryError = ErrorType<unknown>;
/**
 * @summary List income records
 */
export declare function useListIncome<TData = Awaited<ReturnType<typeof listIncome>>, TError = ErrorType<unknown>>(params?: ListIncomeParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listIncome>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteIncomeUrl: (id: number) => string;
/**
 * @summary Delete an income record
 */
export declare const deleteIncome: (id: number, options?: RequestInit) => Promise<DeleteIncome200>;
export declare const getDeleteIncomeMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIncome>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteIncome>>, TError, {
    id: number;
}, TContext>;
export type DeleteIncomeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteIncome>>>;
export type DeleteIncomeMutationError = ErrorType<unknown>;
/**
* @summary Delete an income record
*/
export declare const useDeleteIncome: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteIncome>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteIncome>>, TError, {
    id: number;
}, TContext>;
export declare const getListDebtsUrl: () => string;
/**
 * @summary List debt records
 */
export declare const listDebts: (options?: RequestInit) => Promise<DebtRecord[]>;
export declare const getListDebtsQueryKey: () => readonly ["/api/debts"];
export declare const getListDebtsQueryOptions: <TData = Awaited<ReturnType<typeof listDebts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDebts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listDebts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListDebtsQueryResult = NonNullable<Awaited<ReturnType<typeof listDebts>>>;
export type ListDebtsQueryError = ErrorType<unknown>;
/**
 * @summary List debt records
 */
export declare function useListDebts<TData = Awaited<ReturnType<typeof listDebts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listDebts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteDebtUrl: (id: number) => string;
/**
 * @summary Delete a debt record
 */
export declare const deleteDebt: (id: number, options?: RequestInit) => Promise<DeleteDebt200>;
export declare const getDeleteDebtMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDebt>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteDebt>>, TError, {
    id: number;
}, TContext>;
export type DeleteDebtMutationResult = NonNullable<Awaited<ReturnType<typeof deleteDebt>>>;
export type DeleteDebtMutationError = ErrorType<unknown>;
/**
* @summary Delete a debt record
*/
export declare const useDeleteDebt: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteDebt>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteDebt>>, TError, {
    id: number;
}, TContext>;
export declare const getSettleDebtUrl: (id: number) => string;
/**
 * @summary Settle a debt (move to income)
 */
export declare const settleDebt: (id: number, options?: RequestInit) => Promise<IncomeRecord>;
export declare const getSettleDebtMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof settleDebt>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof settleDebt>>, TError, {
    id: number;
}, TContext>;
export type SettleDebtMutationResult = NonNullable<Awaited<ReturnType<typeof settleDebt>>>;
export type SettleDebtMutationError = ErrorType<unknown>;
/**
* @summary Settle a debt (move to income)
*/
export declare const useSettleDebt: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof settleDebt>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof settleDebt>>, TError, {
    id: number;
}, TContext>;
export declare const getGetDashboardSummaryUrl: () => string;
/**
 * @summary Dashboard summary stats
 */
export declare const getDashboardSummary: (options?: RequestInit) => Promise<DashboardSummary>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/api/summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Dashboard summary stats
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListReservationsUrl: (params?: ListReservationsParams) => string;
/**
 * @summary List reservations
 */
export declare const listReservations: (params?: ListReservationsParams, options?: RequestInit) => Promise<Reservation[]>;
export declare const getListReservationsQueryKey: (params?: ListReservationsParams) => readonly ["/api/reservations", ...ListReservationsParams[]];
export declare const getListReservationsQueryOptions: <TData = Awaited<ReturnType<typeof listReservations>>, TError = ErrorType<unknown>>(params?: ListReservationsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReservations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listReservations>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListReservationsQueryResult = NonNullable<Awaited<ReturnType<typeof listReservations>>>;
export type ListReservationsQueryError = ErrorType<unknown>;
/**
 * @summary List reservations
 */
export declare function useListReservations<TData = Awaited<ReturnType<typeof listReservations>>, TError = ErrorType<unknown>>(params?: ListReservationsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReservations>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateReservationUrl: () => string;
/**
 * @summary Create a new reservation
 */
export declare const createReservation: (createReservationBody: CreateReservationBody, options?: RequestInit) => Promise<Reservation>;
export declare const getCreateReservationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReservation>>, TError, {
        data: BodyType<CreateReservationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createReservation>>, TError, {
    data: BodyType<CreateReservationBody>;
}, TContext>;
export type CreateReservationMutationResult = NonNullable<Awaited<ReturnType<typeof createReservation>>>;
export type CreateReservationMutationBody = BodyType<CreateReservationBody>;
export type CreateReservationMutationError = ErrorType<unknown>;
/**
* @summary Create a new reservation
*/
export declare const useCreateReservation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReservation>>, TError, {
        data: BodyType<CreateReservationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createReservation>>, TError, {
    data: BodyType<CreateReservationBody>;
}, TContext>;
export declare const getUpdateReservationUrl: (id: number) => string;
/**
 * @summary Update a reservation
 */
export declare const updateReservation: (id: number, updateReservationBody: UpdateReservationBody, options?: RequestInit) => Promise<Reservation>;
export declare const getUpdateReservationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReservation>>, TError, {
        id: number;
        data: BodyType<UpdateReservationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateReservation>>, TError, {
    id: number;
    data: BodyType<UpdateReservationBody>;
}, TContext>;
export type UpdateReservationMutationResult = NonNullable<Awaited<ReturnType<typeof updateReservation>>>;
export type UpdateReservationMutationBody = BodyType<UpdateReservationBody>;
export type UpdateReservationMutationError = ErrorType<unknown>;
/**
* @summary Update a reservation
*/
export declare const useUpdateReservation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReservation>>, TError, {
        id: number;
        data: BodyType<UpdateReservationBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateReservation>>, TError, {
    id: number;
    data: BodyType<UpdateReservationBody>;
}, TContext>;
export declare const getDeleteReservationUrl: (id: number) => string;
/**
 * @summary Delete a reservation
 */
export declare const deleteReservation: (id: number, options?: RequestInit) => Promise<DeleteReservation200>;
export declare const getDeleteReservationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReservation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteReservation>>, TError, {
    id: number;
}, TContext>;
export type DeleteReservationMutationResult = NonNullable<Awaited<ReturnType<typeof deleteReservation>>>;
export type DeleteReservationMutationError = ErrorType<unknown>;
/**
* @summary Delete a reservation
*/
export declare const useDeleteReservation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReservation>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteReservation>>, TError, {
    id: number;
}, TContext>;
export declare const getListMaintenanceUrl: (params?: ListMaintenanceParams) => string;
/**
 * @summary List maintenance records
 */
export declare const listMaintenance: (params?: ListMaintenanceParams, options?: RequestInit) => Promise<MaintenanceRecord[]>;
export declare const getListMaintenanceQueryKey: (params?: ListMaintenanceParams) => readonly ["/api/maintenance", ...ListMaintenanceParams[]];
export declare const getListMaintenanceQueryOptions: <TData = Awaited<ReturnType<typeof listMaintenance>>, TError = ErrorType<unknown>>(params?: ListMaintenanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMaintenance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMaintenance>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMaintenanceQueryResult = NonNullable<Awaited<ReturnType<typeof listMaintenance>>>;
export type ListMaintenanceQueryError = ErrorType<unknown>;
/**
 * @summary List maintenance records
 */
export declare function useListMaintenance<TData = Awaited<ReturnType<typeof listMaintenance>>, TError = ErrorType<unknown>>(params?: ListMaintenanceParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMaintenance>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateMaintenanceUrl: () => string;
/**
 * @summary Create a maintenance record
 */
export declare const createMaintenance: (createMaintenanceBody: CreateMaintenanceBody, options?: RequestInit) => Promise<MaintenanceRecord>;
export declare const getCreateMaintenanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMaintenance>>, TError, {
        data: BodyType<CreateMaintenanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMaintenance>>, TError, {
    data: BodyType<CreateMaintenanceBody>;
}, TContext>;
export type CreateMaintenanceMutationResult = NonNullable<Awaited<ReturnType<typeof createMaintenance>>>;
export type CreateMaintenanceMutationBody = BodyType<CreateMaintenanceBody>;
export type CreateMaintenanceMutationError = ErrorType<unknown>;
/**
* @summary Create a maintenance record
*/
export declare const useCreateMaintenance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMaintenance>>, TError, {
        data: BodyType<CreateMaintenanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMaintenance>>, TError, {
    data: BodyType<CreateMaintenanceBody>;
}, TContext>;
export declare const getUpdateMaintenanceUrl: (id: number) => string;
/**
 * @summary Update a maintenance record
 */
export declare const updateMaintenance: (id: number, updateMaintenanceBody: UpdateMaintenanceBody, options?: RequestInit) => Promise<MaintenanceRecord>;
export declare const getUpdateMaintenanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMaintenance>>, TError, {
        id: number;
        data: BodyType<UpdateMaintenanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMaintenance>>, TError, {
    id: number;
    data: BodyType<UpdateMaintenanceBody>;
}, TContext>;
export type UpdateMaintenanceMutationResult = NonNullable<Awaited<ReturnType<typeof updateMaintenance>>>;
export type UpdateMaintenanceMutationBody = BodyType<UpdateMaintenanceBody>;
export type UpdateMaintenanceMutationError = ErrorType<unknown>;
/**
* @summary Update a maintenance record
*/
export declare const useUpdateMaintenance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMaintenance>>, TError, {
        id: number;
        data: BodyType<UpdateMaintenanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMaintenance>>, TError, {
    id: number;
    data: BodyType<UpdateMaintenanceBody>;
}, TContext>;
export declare const getDeleteMaintenanceUrl: (id: number) => string;
/**
 * @summary Delete a maintenance record
 */
export declare const deleteMaintenance: (id: number, options?: RequestInit) => Promise<DeleteMaintenance200>;
export declare const getDeleteMaintenanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMaintenance>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMaintenance>>, TError, {
    id: number;
}, TContext>;
export type DeleteMaintenanceMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMaintenance>>>;
export type DeleteMaintenanceMutationError = ErrorType<unknown>;
/**
* @summary Delete a maintenance record
*/
export declare const useDeleteMaintenance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMaintenance>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMaintenance>>, TError, {
    id: number;
}, TContext>;
export declare const getListExpensesUrl: (params?: ListExpensesParams) => string;
/**
 * @summary List expenses
 */
export declare const listExpenses: (params?: ListExpensesParams, options?: RequestInit) => Promise<Expense[]>;
export declare const getListExpensesQueryKey: (params?: ListExpensesParams) => readonly ["/api/expenses", ...ListExpensesParams[]];
export declare const getListExpensesQueryOptions: <TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(params?: ListExpensesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListExpensesQueryResult = NonNullable<Awaited<ReturnType<typeof listExpenses>>>;
export type ListExpensesQueryError = ErrorType<unknown>;
/**
 * @summary List expenses
 */
export declare function useListExpenses<TData = Awaited<ReturnType<typeof listExpenses>>, TError = ErrorType<unknown>>(params?: ListExpensesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExpenses>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateExpenseUrl: () => string;
/**
 * @summary Create an expense
 */
export declare const createExpense: (createExpenseBody: CreateExpenseBody, options?: RequestInit) => Promise<Expense>;
export declare const getCreateExpenseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
        data: BodyType<CreateExpenseBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
    data: BodyType<CreateExpenseBody>;
}, TContext>;
export type CreateExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof createExpense>>>;
export type CreateExpenseMutationBody = BodyType<CreateExpenseBody>;
export type CreateExpenseMutationError = ErrorType<unknown>;
/**
* @summary Create an expense
*/
export declare const useCreateExpense: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createExpense>>, TError, {
        data: BodyType<CreateExpenseBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createExpense>>, TError, {
    data: BodyType<CreateExpenseBody>;
}, TContext>;
export declare const getDeleteExpenseUrl: (id: number) => string;
/**
 * @summary Delete an expense
 */
export declare const deleteExpense: (id: number, options?: RequestInit) => Promise<DeleteExpense200>;
export declare const getDeleteExpenseMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
    id: number;
}, TContext>;
export type DeleteExpenseMutationResult = NonNullable<Awaited<ReturnType<typeof deleteExpense>>>;
export type DeleteExpenseMutationError = ErrorType<unknown>;
/**
* @summary Delete an expense
*/
export declare const useDeleteExpense: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteExpense>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteExpense>>, TError, {
    id: number;
}, TContext>;
export declare const getGetAccountsSummaryUrl: (params?: GetAccountsSummaryParams) => string;
/**
 * @summary Get income/expenses/profit summary for a period
 */
export declare const getAccountsSummary: (params?: GetAccountsSummaryParams, options?: RequestInit) => Promise<AccountsSummary>;
export declare const getGetAccountsSummaryQueryKey: (params?: GetAccountsSummaryParams) => readonly ["/api/accounts/summary", ...GetAccountsSummaryParams[]];
export declare const getGetAccountsSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getAccountsSummary>>, TError = ErrorType<unknown>>(params?: GetAccountsSummaryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccountsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAccountsSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAccountsSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getAccountsSummary>>>;
export type GetAccountsSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get income/expenses/profit summary for a period
 */
export declare function useGetAccountsSummary<TData = Awaited<ReturnType<typeof getAccountsSummary>>, TError = ErrorType<unknown>>(params?: GetAccountsSummaryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccountsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListContractsUrl: () => string;
/**
 * @summary List all contracts
 */
export declare const listContracts: (options?: RequestInit) => Promise<Contract[]>;
export declare const getListContractsQueryKey: () => readonly ["/api/contracts"];
export declare const getListContractsQueryOptions: <TData = Awaited<ReturnType<typeof listContracts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContracts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listContracts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListContractsQueryResult = NonNullable<Awaited<ReturnType<typeof listContracts>>>;
export type ListContractsQueryError = ErrorType<unknown>;
/**
 * @summary List all contracts
 */
export declare function useListContracts<TData = Awaited<ReturnType<typeof listContracts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContracts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateContractUrl: () => string;
/**
 * @summary Create or update a contract
 */
export declare const createContract: (upsertContractBody: UpsertContractBody, options?: RequestInit) => Promise<Contract>;
export declare const getCreateContractMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createContract>>, TError, {
        data: BodyType<UpsertContractBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createContract>>, TError, {
    data: BodyType<UpsertContractBody>;
}, TContext>;
export type CreateContractMutationResult = NonNullable<Awaited<ReturnType<typeof createContract>>>;
export type CreateContractMutationBody = BodyType<UpsertContractBody>;
export type CreateContractMutationError = ErrorType<unknown>;
/**
* @summary Create or update a contract
*/
export declare const useCreateContract: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createContract>>, TError, {
        data: BodyType<UpsertContractBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createContract>>, TError, {
    data: BodyType<UpsertContractBody>;
}, TContext>;
export declare const getUpdateContractUrl: (id: string) => string;
/**
 * @summary Update a contract
 */
export declare const updateContract: (id: string, upsertContractBody: UpsertContractBody, options?: RequestInit) => Promise<Contract>;
export declare const getUpdateContractMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContract>>, TError, {
        id: string;
        data: BodyType<UpsertContractBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateContract>>, TError, {
    id: string;
    data: BodyType<UpsertContractBody>;
}, TContext>;
export type UpdateContractMutationResult = NonNullable<Awaited<ReturnType<typeof updateContract>>>;
export type UpdateContractMutationBody = BodyType<UpsertContractBody>;
export type UpdateContractMutationError = ErrorType<unknown>;
/**
* @summary Update a contract
*/
export declare const useUpdateContract: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContract>>, TError, {
        id: string;
        data: BodyType<UpsertContractBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateContract>>, TError, {
    id: string;
    data: BodyType<UpsertContractBody>;
}, TContext>;
export declare const getDeleteContractUrl: (id: string) => string;
/**
 * @summary Delete a contract
 */
export declare const deleteContract: (id: string, options?: RequestInit) => Promise<void>;
export declare const getDeleteContractMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteContract>>, TError, {
        id: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteContract>>, TError, {
    id: string;
}, TContext>;
export type DeleteContractMutationResult = NonNullable<Awaited<ReturnType<typeof deleteContract>>>;
export type DeleteContractMutationError = ErrorType<unknown>;
/**
* @summary Delete a contract
*/
export declare const useDeleteContract: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteContract>>, TError, {
        id: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteContract>>, TError, {
    id: string;
}, TContext>;
export declare const getGetCarPhotosUrl: (carId: number) => string;
/**
 * @summary Get photos for a car
 */
export declare const getCarPhotos: (carId: number, options?: RequestInit) => Promise<CarPhotos>;
export declare const getGetCarPhotosQueryKey: (carId: number) => readonly [`/api/car-photos/${number}`];
export declare const getGetCarPhotosQueryOptions: <TData = Awaited<ReturnType<typeof getCarPhotos>>, TError = ErrorType<unknown>>(carId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCarPhotos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCarPhotos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCarPhotosQueryResult = NonNullable<Awaited<ReturnType<typeof getCarPhotos>>>;
export type GetCarPhotosQueryError = ErrorType<unknown>;
/**
 * @summary Get photos for a car
 */
export declare function useGetCarPhotos<TData = Awaited<ReturnType<typeof getCarPhotos>>, TError = ErrorType<unknown>>(carId: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCarPhotos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateCarPhotosUrl: (carId: number) => string;
/**
 * @summary Update photos for a car
 */
export declare const updateCarPhotos: (carId: number, updateCarPhotosBody: UpdateCarPhotosBody, options?: RequestInit) => Promise<CarPhotos>;
export declare const getUpdateCarPhotosMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCarPhotos>>, TError, {
        carId: number;
        data: BodyType<UpdateCarPhotosBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateCarPhotos>>, TError, {
    carId: number;
    data: BodyType<UpdateCarPhotosBody>;
}, TContext>;
export type UpdateCarPhotosMutationResult = NonNullable<Awaited<ReturnType<typeof updateCarPhotos>>>;
export type UpdateCarPhotosMutationBody = BodyType<UpdateCarPhotosBody>;
export type UpdateCarPhotosMutationError = ErrorType<unknown>;
/**
* @summary Update photos for a car
*/
export declare const useUpdateCarPhotos: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateCarPhotos>>, TError, {
        carId: number;
        data: BodyType<UpdateCarPhotosBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateCarPhotos>>, TError, {
    carId: number;
    data: BodyType<UpdateCarPhotosBody>;
}, TContext>;
export declare const getListMonthlyReportsUrl: () => string;
/**
 * @summary List all monthly reports
 */
export declare const listMonthlyReports: (options?: RequestInit) => Promise<MonthlyReport[]>;
export declare const getListMonthlyReportsQueryKey: () => readonly ["/api/monthly-reports"];
export declare const getListMonthlyReportsQueryOptions: <TData = Awaited<ReturnType<typeof listMonthlyReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMonthlyReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMonthlyReports>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMonthlyReportsQueryResult = NonNullable<Awaited<ReturnType<typeof listMonthlyReports>>>;
export type ListMonthlyReportsQueryError = ErrorType<unknown>;
/**
 * @summary List all monthly reports
 */
export declare function useListMonthlyReports<TData = Awaited<ReturnType<typeof listMonthlyReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMonthlyReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateMonthlyReportUrl: () => string;
/**
 * @summary Create or update a monthly report
 */
export declare const createMonthlyReport: (upsertMonthlyReportBody: UpsertMonthlyReportBody, options?: RequestInit) => Promise<MonthlyReport>;
export declare const getCreateMonthlyReportMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMonthlyReport>>, TError, {
        data: BodyType<UpsertMonthlyReportBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMonthlyReport>>, TError, {
    data: BodyType<UpsertMonthlyReportBody>;
}, TContext>;
export type CreateMonthlyReportMutationResult = NonNullable<Awaited<ReturnType<typeof createMonthlyReport>>>;
export type CreateMonthlyReportMutationBody = BodyType<UpsertMonthlyReportBody>;
export type CreateMonthlyReportMutationError = ErrorType<unknown>;
/**
* @summary Create or update a monthly report
*/
export declare const useCreateMonthlyReport: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMonthlyReport>>, TError, {
        data: BodyType<UpsertMonthlyReportBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMonthlyReport>>, TError, {
    data: BodyType<UpsertMonthlyReportBody>;
}, TContext>;
export declare const getDeleteMonthlyReportUrl: (id: string) => string;
/**
 * @summary Delete a monthly report
 */
export declare const deleteMonthlyReport: (id: string, options?: RequestInit) => Promise<void>;
export declare const getDeleteMonthlyReportMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMonthlyReport>>, TError, {
        id: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMonthlyReport>>, TError, {
    id: string;
}, TContext>;
export type DeleteMonthlyReportMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMonthlyReport>>>;
export type DeleteMonthlyReportMutationError = ErrorType<unknown>;
/**
* @summary Delete a monthly report
*/
export declare const useDeleteMonthlyReport: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMonthlyReport>>, TError, {
        id: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMonthlyReport>>, TError, {
    id: string;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map