export class ScoreManager {
	protected score = 0;
	protected text: HTMLSpanElement;

	public load(target: HTMLElement) {
		this.text = document.createElement('span');
		this.text.style.position = 'absolute';
		this.text.style.top = '20px';
		this.text.style.right = '20px';
		this.text.style.fontSize = '4rem';
		this.text.innerText = '0';
		target.appendChild(this.text);
	}

	public increaseScore(amount: number) {
		this.score += amount;
		this.text.innerText = this.score.toString();
	}
}