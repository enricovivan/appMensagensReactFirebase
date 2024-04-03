
const roles = ['professor', 'aluno'] as const
type Roles = (typeof roles)[number]

export type MessageBoxType = {
    personName: string,
    message: string,
    sendTime: string,
    role: Roles
}