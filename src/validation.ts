export interface Status {
  valid: boolean
  message?: string
}

type Rule = (value: string) => Status

export function length({ min, max }: { min: number; max: number }): Rule {
  return function (value: string): Status {
    const result = Boolean(value.length >= min && value.length <= max)

    return {
      valid: result,
      message: result ? undefined : `This field must bo between ${min} and ${max}`,
    }
  }
}

export const required = (value: string): Status => {
  const result = Boolean(value)

  return {
    valid: result,
    message: result ? undefined : 'This field is required',
  }
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      return result
    }
  }

  return {
    valid: true,
  }
}

console.log(
  validate('a', [length({ min: 5, max: 10 })]),
  validate('afdasfasd', [length({ min: 5, max: 10 })]),
  validate('aadsfffffffasdfasdfasdfasdf', [length({ min: 5, max: 10 })])
)
