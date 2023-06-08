export interface ICompany {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyCreateRequest {
  name: string;
  image?: string;
}

export interface ICompanyUpdateRequest {
  name?: string;
  image?: string;
}
