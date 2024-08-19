export enum PasswordErrors {
  SHORT = "Password is too short",
  NO_UPPERCASE = "Upper case letter required",
  NO_LOWERCASE = "Lower case letter required",
  NO_NUMBER = "At least one number required",
}

export interface CheckResult {
  valid: boolean
  reasons: PasswordErrors[]
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = []

    this.checkForLength(password, reasons)
    this.checkForUpperCase(password, reasons)
    this.checkForLowerCase(password, reasons)

    return {
      valid: reasons.length === 0,
      reasons,
    }
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password)
    this.checkForNumber(password, basicCheck.reasons)

    return {
      valid: basicCheck.reasons.length === 0,
      reasons: basicCheck.reasons,
    }
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT)
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPERCASE)
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWERCASE)
    }
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    if (!/[0-9]/.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER)
    }
  }
}
