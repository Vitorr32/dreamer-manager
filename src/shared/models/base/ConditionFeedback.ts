export class Feedback {
    public valid: boolean = false;
    public message: string = '';
}

export class NodeFeedback extends Feedback {
    public childrenFeedback: NodeFeedback[] = []
    public conditionFeedbacks: Feedback[] = []
}
