export class Feedback {
    public valid: boolean
    public message: string | undefined

    constructor(valid?: boolean, message?: string) {
        this.message = message
        this.valid = valid ? valid : false
    }
}

export class NodeFeedback extends Feedback {
    public childrenFeedback: NodeFeedback[] = []
    public conditionFeedbacks: Feedback[] = []
}
