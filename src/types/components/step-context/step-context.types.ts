export type useStepContextType = () => {
  handleStepData: (label: string, data: string) => void
  stepData: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}
