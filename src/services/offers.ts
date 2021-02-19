import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/offers');
}

export async function addOffer(params: any): Promise<any> {
  return request(`/api/offers`, {
    method: 'post',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function editOffer({ offerId, data }: any): Promise<any> {
  return request(`/api/offers/${offerId}`, {
    method: 'put',
    data: { ...data },
  });
}

export async function getOffer(offerId: any): Promise<any> {
  return request(`/api/offers/${offerId}`);
}


export async function deleteOffer({ id } : { id: string }): Promise<any> {
  return request.delete(`/api/offers/${id}`);
}

