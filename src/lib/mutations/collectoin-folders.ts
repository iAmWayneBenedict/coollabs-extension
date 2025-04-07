import { useHookMutation } from './mutation-hook'

export const usePostCreateCollectionsMutation = ({ ...options }) =>
  useHookMutation({ endpoint: '/resource-collections/create', ...options })
