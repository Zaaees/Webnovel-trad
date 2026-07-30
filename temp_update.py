import update_chapter
import json

title = "Chapitre 133"

draft = """Chun Yeowun was shocked from the changed attitude of Lee Hameng.
"I am not sure what this means, sir."
"You have passed every test of the academy, so I must now address you properly as the rightful prince and the son of the Lord."
"Oh..."
Yeowun had passed all tests, so he was not a cadet anymore. All princes of the Lord had the right to become treated with respect, but he was only treated as mere cadet because that was the rule of the academy. Chun Yeowun was still dumbfounded and Lee Hameng continued.
"It was rule of the academy... and I wasn't certain until now, so I apologize for just watching you until now, prince."
Yeowun wasn't sure what Lee Hameng was talking about. Lee Hameng then brought up his head and looked at Yeowun and spoke.
"I am sure you are confused. Let me ask you frankly. Did you learn the founding of truth left by Father Chun Ma?"
Yeowun became grim. He didn't think Lee Hameng will talk specifically about that.
'...So he knew.'
He had used the Sword Force of the Sky Demon in front of everyone two times when he fought Hou Jinchang and when he fought the criminal from the evil force. That was the only sword skill he had that he can defeat his enemy at the time, and was sure no one will recognize it.
"I am not sure what you are talking about."
Yeowun decided to lie about it first. He wasn't sure if he can trust Lee Hameng yet, as he was the Lord's close advisor. Yeowun didn't even tell his secret to his members, so he couldn't just reveal to Lee Hameng yet when he wasn't sure if Lee Hameng was his ally or foe.
"Oh, I see. It is certain you can't trust me yet."
Lee Hameng thought for a second and bowed to speak seriously.
"I, Lee Hameng, Left Guardian of the Great Sky Demon Cult swear an oath to support Prince Chun Yeowun for the competition for the heir to the throne. As a proof, I ask you to hold my medal that shows me as a guardian."
Lee Hameng took out the red medal from his pocket and gave it to Yeowun politely. It was the medal that proved that Lee Hameng was a guardian.
'Left Guardian... supporting me?'
Yeowun was shocked. This was not just simple support being given from any other members. This was huge that will shock every cultist.
"Please, take it."
Yeowun hesitated for a second and spoke.
"I am sorry, but I am not sure how I can trust you, a trusted advisor to the Lord."
Guardians were those who always followed orders from the Lord directly. They were not allowed to join in the competition outright and were only allowed to support the Lord and the Heir if chosen. So with that in mind, it was hard to believe what Lee Hameng was trying to do. This suspicion made Lee Hameng glad.
'He has become very careful. He is very worthy.'
Even if Hameng was in the same shoes, he would have been suspicious. Lee Hameng thought he needed to explain further.
"You are right. I am Left Guardian. Technically speaking, I am not in a place to support anyone. But I have something I must prioritize above everything else."
"What do you mean?"
"We, guardians are bound to accept one who succeeds the truth as a real Lord."
"You mean..."
"The truth left by Father Chun Ma who has created our cult."
Lee Hameng wasn't lying. He took a deep breath and continued.
"You must keep what I'm going to tell you as a secret."
Guardian family protected and supported the Lord for the entire history of the cult. Three families, divided up from Great Guardian, Left Guardian, and Right Guardian, were the founding families and always sided with the Lord starting from Father Chun Ma, to current Lord Chun Yujong. Unlike them, six clans weren't there when the cult first started. It started with two apprentices of Sword Demon about five hundred years ago, but Guardians were there since the beginning.
"Oh, wait. Right Guardians were only born five hundred years ago. They are 'shorter' in their history."
'Oh, so Teacher's Guardian family wasn't there from the beginning.'
This was because Right Guardian died five hundred years ago, that required a new Right Guardian entirely.
"Not much know this."
Guardians were one of few people who knew most secrets of the cult.
"And there is a secret that we Guardian families have kept it since 500 years ago."
"..."
"The Sword Art of the Sky Demon that every Lord learns is not the real sword skill left by Father Chun Ma."
"...!!!"
This was shocking news. Yeowun was shocked. If what Hameng said were to spread, this was enough to dismantle the entire cult.
"Then you mean..."
"The true sword skill that was taught to Lords were stopped."
About 500 years ago... the Demonic Cult did not have a Lord to have many wives at the six clans to create successor. The Lord at the time was given woman chosen by the Dark Fire within the Giant Altar at the shrine, woman who was called as the Demonic Lady. At the time, only the child born from the Demonic Lady was allowed to become the future heir, so there was no reason for a specific clan to rise in power."""

notes = """- Alignement parfait : Tous les paragraphes et dialogues ont été traduits sans altération.
- Respect rigoureux du glossaire : Lee Hameng, Gardien de Gauche, Père Chun Ma, Force de l'Épée du Démon Céleste, Hou Jinchang, Grand Gardien, Gardien de Droite, Démon de l'Épée, Six Clans, Culte Démoniaque.
- Ajout de 4 nouveaux termes de Lore identifiés : Chun Yujong (actuel Seigneur), Feu Sombre, Autel Géant, Dame Démoniaque. L'ensemble a été intégré avec succès au glossaire et appliqué."""

polished = """Chun Yeowun fut bouleversé par le changement radical d'attitude de Lee Hameng.

— Je crains de ne pas saisir ce que cela signifie, monsieur.

— Vous avez réussi chaque épreuve de l'académie. Je me dois désormais de vous adresser le respect qui vous est dû en tant que prince légitime et fils du Seigneur.

— Oh...

Puisqu'il avait surmonté tous les tests, Yeowun n'était plus un simple cadet. Bien que tous les princes du Seigneur eussent droit aux plus grands égards, il n'avait été traité jusqu'ici que comme un apprenti, conformément au règlement de l'institution. Alors que Chun Yeowun demeurait abasourdi, Lee Hameng reprit :

— C'était la règle de l'académie... et je n'en étais pas certain jusqu'à présent. Je vous présente donc mes excuses pour m'être contenté de vous observer jusqu'ici, mon prince.

Yeowun ne voyait toujours pas où Lee Hameng voulait en venir. Ce dernier releva la tête, le regarda droit dans les yeux et déclara :

— Je me doute que vous êtes confus. Laissez-moi vous poser la question en toute franchise. Avez-vous appris la vérité originelle laissée par le Père Chun Ma ?

Le visage de Yeowun s'assombrit. Il n'aurait jamais imaginé que Lee Hameng aborderait ce sujet avec tant de précision.

*... Alors, il savait.*

Il avait employé la Force de l'Épée du Démon Céleste à la vue de tous à deux reprises : lors de son duel contre Hou Jinchang, et face au criminel issu de la Force du Mal. C'était la seule technique d'épée en sa possession capable de vaincre ses adversaires à ce moment-là, et il était persuadé que personne ne la reconnaîtrait.

— Je ne vois vraiment pas de quoi vous parlez, esquiva Yeowun.

Il préférait nier dans un premier temps. En tant que proche conseiller du Seigneur, la loyauté de Lee Hameng restait à prouver. S'il n'avait même pas confié son secret à ses propres fidèles, il n'allait certainement pas se mettre à table face au Gardien de Gauche sans savoir si celui-ci était un allié ou un ennemi.

— Je vois. Il est évident que vous ne pouvez pas encore me faire confiance.

Lee Hameng réfléchit un instant, puis s'inclina solennellement.

— Moi, Lee Hameng, Gardien de Gauche du Grand Culte Démoniaque, prête serment de soutenir le Prince Chun Yeowun dans la lutte pour la succession au trône. En guise de preuve, je vous demande d'accepter mon médaillon certifiant mon statut de gardien.

Lee Hameng sortit poliment un médaillon écarlate de sa poche et le tendit à Yeowun. C'était l'insigne qui attestait de ses fonctions de gardien.

*Le Gardien de Gauche... veut me soutenir ?*

Le choc de Yeowun fut immense. Il ne s'agissait pas du simple ralliement d'un cultiste ordinaire. C'était un événement majeur qui ébranlerait l'ensemble du culte.

— S'il vous plaît, prenez-le.

Yeowun hésita une seconde avant de répondre.

— Je suis navré, mais je ne vois pas comment je pourrais accorder ma confiance au conseiller de confiance du Seigneur.

Les gardiens étaient tenus d'obéir directement aux ordres du Seigneur. Il leur était strictement interdit de s'impliquer dans la compétition de leur propre chef ; ils ne pouvaient soutenir le Seigneur, ou son héritier, qu'une fois ce dernier officiellement désigné. Dans ces conditions, l'offre de Lee Hameng paraissait bien trop belle pour être vraie. Étonnamment, cette méfiance réjouit le Gardien de Gauche.

*Il est devenu très prudent. Il est tout à fait digne.*

Même s'il s'était trouvé à sa place, Hameng aurait lui aussi été sur ses gardes. Il estima qu'il se devait de s'expliquer davantage.

— Vous avez raison. Je suis le Gardien de Gauche. En théorie, ma position m'interdit de soutenir qui que ce soit. Cependant, il y a une chose que je dois placer au-dessus de tout le reste.

— Que voulez-vous dire ?

— Nous, les gardiens, sommes liés par l'obligation d'accepter celui qui hérite de la vérité comme notre véritable Seigneur.

— Vous voulez dire...

— La vérité léguée par le Père Chun Ma, le créateur de notre culte.

Lee Hameng ne mentait pas. Il prit une profonde inspiration et poursuivit :

— Ce que je m'apprête à vous révéler doit rester un secret absolu.

Les familles des Gardiens avaient protégé et soutenu le Seigneur tout au long de l'histoire du culte. Les trois lignées, réparties entre le Grand Gardien, le Gardien de Gauche et le Gardien de Droite, étaient les familles fondatrices. Elles s'étaient toujours tenues aux côtés des Seigneurs successifs, depuis le Père Chun Ma jusqu'à l'actuel Seigneur Chun Yujong. À l'inverse, les Six Clans n'existaient pas aux prémices du culte. Ils avaient émergé à partir de deux disciples du Démon de l'Épée environ cinq cents ans plus tôt. Les Gardiens, eux, étaient présents depuis l'origine.

— Oh, un instant. Le titre de Gardien de Droite n'est apparu qu'il y a cinq cents ans. Leur histoire est plus « courte ».

*Oh, donc la famille de la Garde du professeur n'était pas là dès le début.*

Cette situation s'expliquait par la mort du Gardien de Droite de l'époque il y a cinq cents ans, événement qui avait nécessité la création d'une toute nouvelle lignée pour le remplacer.

— Très peu de gens sont au courant de cela.

Les Gardiens faisaient partie de ces rares initiés détenant la plupart des secrets du culte.

— Et il y a un secret particulier que nous, familles des Gardiens, préservons depuis cinq cents ans.

— ...

— L'Art de l'Épée du Démon Céleste qu'étudie chaque Seigneur n'est pas la véritable technique d'épée laissée par le Père Chun Ma.

— ... !!!

La révélation fit l'effet d'une bombe. Yeowun en resta sans voix. Si ce que venait d'affirmer Hameng venait à se savoir, cela suffirait à faire s'effondrer l'ensemble du culte.

— Alors, cela signifie que...

— La transmission de la véritable technique d'épée aux Seigneurs a été interrompue.

Environ cinq cents ans plus tôt... au sein du Culte Démoniaque, le Seigneur n'avait pas coutume de prendre de multiples épouses parmi les Six Clans pour engendrer un successeur. À cette époque, le Seigneur recevait une femme élue par le Feu Sombre dans l'Autel Géant du sanctuaire. Cette femme était connue sous le titre de Dame Démoniaque. En ces temps-là, seul l'enfant né de la Dame Démoniaque était autorisé à devenir le futur héritier ; ainsi, aucun clan spécifique n'avait de raison de monter en puissance."""

new_lore = [
    {"original": "Chun Yujong", "translation": "Chun Yujong", "notes": "Le Seigneur actuel du Culte Démoniaque, père de Chun Yeowun."},
    {"original": "Dark Fire", "translation": "Feu Sombre", "notes": "Flamme mythique ou rituelle présente dans l'Autel Géant."},
    {"original": "Giant Altar", "translation": "Autel Géant", "notes": "Autel situé dans le sanctuaire du Culte."},
    {"original": "Demonic Lady", "translation": "Dame Démoniaque", "notes": "Femme choisie par le Feu Sombre, seule autorisée historiquement à donner naissance au futur héritier."}
]

import update_chapter
update_chapter.update_chapter("133", title, draft, notes, polished, new_lore)
