import { httpGet, httpPost } from "./../../../api";

export const fetchAssemblyFeatures = (params) => httpGet({
  url: '/api/features/assembly', params
});

export const submitAssemblyFormData = (data) => httpPost({
  url: '/api/call_request/send?type=assembly', 
  data: data,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});