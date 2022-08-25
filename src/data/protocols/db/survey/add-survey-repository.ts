import { AddSurveyModel } from '@/domain/usecases/add-survey/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
