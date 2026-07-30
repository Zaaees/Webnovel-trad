import json
from update_chapter import update_chapter

N = "190"
title = "Chapitre 190 : Face-à-face (5)"

draft = """« S'il vous plaît, approuvez-moi comme héritier du trône ! »

Suite à la demande inattendue de Chun Yeowun, tout le monde dans la Grande Salle a été choqué. Ceux qui ont été les plus choqués étaient les anciens de cinq clans. Ils étaient mal à l'aise à l'idée que Yeowun devienne un ancien, et sont devenus encore plus furieux lorsque Yeowun a demandé l'approbation pour devenir l'héritier.

‘Bon sang !’

‘Il... visait ça !’

Yeowun avait profité d'une occasion pour faire sa demande au Seigneur. Et il y avait trois anciens qui soutenaient Yeowun. Ils approuvaient certainement Yeowun.

‘D-depuis quand les a-t-il persuadés ?’

‘Yin Moha ? Huan Yi ?’

En dehors de Sama Yi, Yin Moha et Huan Yi étaient connus pour leur nature indisciplinée et leur entêtement. Mais tous deux étaient maintenant à genoux et demandaient l'ascension de Yeowun au rang de futur Seigneur.

‘Je dois arrêter...’

Mais les anciens de cinq clans n'avaient aucune raison ni aucun moyen d'empêcher cela de se produire. Et avec tous les chefs de clan du culte qui les regardaient, ils ne pouvaient pas simplement s'y opposer par émotion sans être ridiculisés par la suite.

‘Bon sang... !’

‘Pas moyen !’

Chun Yeowun avait vaincu tous les concurrents lors de la compétition et avait également obtenu l'approbation de trois anciens. Avec l'approbation du Seigneur, il allait maintenant être nommé nouvel héritier du trône. Les anciens étaient fous de penser qu'ils pouvaient se débarrasser de Yeowun à tout moment.

‘Si le Seigneur l'approuve, alors...’

C'était le pire scénario possible. Si quelqu'un qui ne faisait pas partie des Six Clans devait succéder au trône, alors cela allait être la chute des Six Clans. Tout le monde s'est tourné vers le Seigneur. Chun Yujong avait l'air surpris.

‘...Est-il vraiment le garçon que j'ai connu ?’

Chun Yujong était stupéfait par Chun Yeowun. Lorsque Yeowun est apparu pour la première fois en tant qu'ancien, il a été surpris par cet enfant qui ne le préoccupait pas le moins du monde, devenant puissant en si peu de temps. Mais maintenant, Chun Yujong était stupéfait par les mouvements intelligents de Yeowun. Yeowun s'inclinait respectueusement, mais ses yeux étaient pleins de confiance alors qu'il levait les yeux vers le Seigneur. Ce n'était pas le jeune garçon vengeur que Yujong avait vu autrefois le premier jour de l'Académie Démoniaque.

‘...Alors, tu veux succéder à mon trône.’

L'atmosphère était devenue tendue, tout le monde se concentrant sur le seigneur. Chun Yujong a alors ouvert la bouche.

« Tous les trois, approuvez-vous le 7e Prince comme héritier ? »

Chun Yujong a demandé et les gens sont devenus rayonnants et frustrés en même temps. Ceux qui étaient du côté de Chun Yeowun se sont réjouis et les anciens et les chefs de clan qui étaient du côté des Six Clans ont froncé les sourcils. Chun Yeowun était maintenant un ancien, mais comme il était appelé le 7e prince, cela signifiait que Chun Yujong le considérait officiellement comme un candidat au trône.

« Moi, Sama Yi, 9e Ancien, j'approuve le Prince Chun Yeowun comme héritier du trône. »

« Moi, Yin Moha, 10e Ancienne, j'approuve le Prince Chun Yeowun comme héritier du trône. »

« Moi, Huan Yi, 11e Ancien, j'approuve le Prince Chun Yeowun comme héritier du trône. »

Et avec leur voix déterminée, Chun Yujong regarda chacun d'eux. Il semblait que ces trois anciens approuvaient vraiment Chun Yeowun comme héritier, et ils ne semblaient pas se soucier des Six Clans.

‘...Peut-être que ce serait une meilleure voie.’

Un héritier qui n'était pas lié aux Six Clans. Ce n'était pas ce que Chun Yujong avait prévu, mais il a décidé que ce n'était pas trop mal non plus. Le Seigneur a alors hoché la tête et a pris sa décision. Alors qu'il allait prononcer sa décision, une aura vive et hostile lui est parvenue. Ce n'était pas seulement Chun Yujong qui l'a ressentie. Tout le monde a ressenti l'énergie hostile et s'est tourné vers la source.

‘L-Le Premier Ancien ?’

La source était le Premier Ancien et Chef du Clan de la Sagesse, Mu Jinwon. Il regardait fixement Chun Yeowun avec des yeux injectés de sang, avec des veines qui gonflaient sur son front en raison de la fureur. Il était sous le choc depuis qu'il avait appris que les membres de sa famille avaient été tués, et il ne se souciait plus de rien d'autre maintenant.

‘Il ose demander à être nommé héritier en ce moment ?!’

Juste avant que le Seigneur et les anciens ne quittent le château du culte, Chun Muyun était très proche du titre d'héritier. Avec les autres princes de chaque clan expulsés, Mu Jinwon croyait que Chun Muyun deviendrait l'héritier sans trop de problèmes. Mais à son retour, il a découvert que tout le monde de son clan était mort pendant son absence. Chun Muyun aussi, avait commis un crime au sein de l'académie, s'était échappé de la prison et avait finalement été retrouvé mort dans le manoir du Clan du Poison. D'après ce que Mu Jinwon pouvait voir, ni Dame Mu ni Chun Muyun n'étaient assez stupides pour faire une chose aussi stupide juste avant que la compétition ne soit presque terminée. Tous les deux étaient morts avec une erreur qu'ils n'auraient jamais commise, et Chun Yeowun est devenu le seul concurrent, et a demandé à être nommé héritier comme s'il l'avait attendu. Avec ça, Mu Jinwon ne pouvait penser qu'à un seul coupable pour ses soupçons.

‘Chun... Yeowun !’"""

notes = """Alignement parfait. Les pensées et descriptions sont toutes présentes. Les concepts (Grande Salle, Six Clans, Académie Démoniaque, Clan de la Sagesse, Clan du Poison) ont été respectés. Les personnages (Yeowun, Sama Yi, Yin Moha, Huan Yi, Chun Yujong, Mu Jinwon, Chun Muyun, Dame Mu) ont été correctement nommés."""

polished = """« Je vous prie de me reconnaître officiellement comme l'héritier du trône ! »

La requête inattendue de Chun Yeowun fit l'effet d'une bombe dans la Grande Salle. Les plus consternés furent sans conteste les Anciens des cinq clans majeurs restants. Déjà profondément contrariés par son élévation au rang d'Ancien, ils fulminaient littéralement en l'entendant réclamer le titre de futur Seigneur.

‘Bon sang !’

‘C'était... c'était ça son objectif depuis le début !’

Yeowun avait su saisir l'opportunité parfaite pour soumettre sa demande au Seigneur. De plus, il était appuyé par trois Anciens agenouillés derrière lui, prêts à soutenir fermement sa candidature.

‘D-Depuis quand s'est-il assuré de leur soutien ?’

‘Yin Moha ? Et Huan Yi ?’

Mis à part Sama Yi, Yin Moha et Huan Yi étaient réputés pour leur indépendance farouche et leur entêtement légendaire. Pourtant, ils se tenaient là, prostrés, implorant l'accession de Yeowun au trône.

‘Il faut que je l'en empêche...’ pensa l'un des Anciens des six clans.

Mais ils n'avaient ni motif valable ni moyen de s'y opposer. Sous le regard attentif de tous les chefs de clans de la secte, s'élever contre cette demande sur un simple coup de sang n'aurait fait que les exposer au ridicule.

‘Putain... !’

‘C'est inconcevable !’

Chun Yeowun avait terrassé tous ses rivaux lors de la compétition et avait réussi l'exploit de rallier trois Anciens à sa cause. Si le Seigneur donnait son accord, il serait officiellement désigné héritier. Les Anciens avaient été bien naïfs de croire qu'ils pourraient se débarrasser de lui à tout moment.

‘Si le Seigneur approuve cela... alors...’

C'était le scénario du pire. Si un candidat n'appartenant pas aux Six Clans venait à succéder au Seigneur, cela marquerait inévitablement la chute de leur hégémonie. Tous les regards convergèrent vers le trône. Chun Yujong lui-même paraissait décontenancé.

‘... Est-ce vraiment le même garçon que j'ai connu ?’

Chun Yujong était subjugué par Chun Yeowun. Lorsque Yeowun avait fait son entrée en tant que nouvel Ancien, il s'était étonné que ce fils, dont il ne s'était jamais soucié, ait pu acquérir une telle puissance en si peu de temps. À présent, c'était l'intelligence tactique de Yeowun qui le stupéfiait. Bien qu'incliné avec respect, le jeune homme levait vers le Seigneur des yeux débordants de confiance et d'assurance. Il n'y avait plus aucune trace du garçon frêle et assoiffé de vengeance qu'Yujong avait brièvement aperçu le jour de son entrée à l'Académie Démoniaque.

‘... Alors, tu ambitionnes de me succéder.’

L'atmosphère était devenue suffocante, l'attention de chacun suspendue aux lèvres du Seigneur. Chun Yujong finit par rompre le silence.

« Tous les trois, approuvez-vous le 7e Prince comme héritier légitime ? »

La question de Chun Yujong déclencha une vague d'émotions contradictoires dans l'assemblée. Les partisans de Chun Yeowun s'illuminèrent de joie, tandis que les Anciens et les chefs de clans inféodés aux Six Clans grimacèrent. Yeowun était certes devenu Ancien, mais en l'appelant "le 7e Prince", Chun Yujong confirmait qu'il le considérait officiellement comme un candidat viable au trône.

« Moi, Sama Yi, 9e Ancien, j'approuve le Prince Chun Yeowun comme héritier du trône. »

« Moi, Yin Moha, 10e Ancienne, j'approuve le Prince Chun Yeowun comme héritier du trône. »

« Moi, Huan Yi, 11e Ancien, j'approuve le Prince Chun Yeowun comme héritier du trône. »

Leurs voix résonnèrent avec une détermination inébranlable. Chun Yujong plongea son regard dans celui de chacun d'eux. Ces trois Anciens semblaient sincèrement convaincus par la légitimité de Chun Yeowun, et se souciaient visiblement peu de s'attirer les foudres des Six Clans.

‘... C'est peut-être la meilleure des solutions, après tout.’ songea le Seigneur.

Un héritier totalement indépendant des Six Clans. Bien que cela n'eût jamais fait partie de ses plans initiaux, Chun Yujong dut admettre que l'idée était loin d'être mauvaise. Il hocha lentement la tête, sa décision prise. 

Mais au moment où il ouvrit la bouche pour la prononcer, une aura meurtrière d'une intensité inouïe figea la salle. Et Chun Yujong ne fut pas le seul à la percevoir. Tous les dignitaires présents ressentirent cette hostilité viscérale et se tournèrent vers son origine.

‘L-Le Premier Ancien ?’

L'intention meurtrière émanait de Mu Jinwon, le Premier Ancien et chef du Clan de la Sagesse. Il foudroyait Chun Yeowun du regard, les yeux injectés de sang, les veines de son front palpitant sous l'effet d'une rage pure. Le choc de la perte de sa famille l'avait poussé dans ses derniers retranchements ; plus rien d'autre n'avait d'importance à ses yeux.

‘Il ose... Il ose réclamer le titre d'héritier à cet instant précis ?!’

Avant que le Seigneur et les Anciens ne quittent le château, Chun Muyun était à deux doigts d'être désigné héritier. Ses rivaux ayant été exclus un à un, Mu Jinwon était convaincu que son neveu accéderait au trône sans la moindre difficulté. Or, à son retour, il découvrait l'anéantissement de son clan. Il avait appris que Chun Muyun avait commis l'irréparable au sein de l'Académie, qu'il s'était évadé de son cachot, pour finalement être retrouvé mort au domaine du Clan du Poison. 

Mu Jinwon savait pertinemment que ni sa sœur, Dame Mu, ni Chun Muyun n'étaient assez stupides pour commettre de telles erreurs alors que la compétition touchait à sa fin. Leurs morts résultaient de fautes qu'ils n'auraient jamais commises de leur plein gré. Résultat : Chun Yeowun se retrouvait le seul candidat en lice et réclamait son dû, comme s'il avait méthodiquement orchestré chaque étape de ce désastre. Pour Mu Jinwon, il n'y avait qu'un seul et unique coupable possible.

‘Chun... Yeowun !’"""

update_chapter(N, title, draft, notes, polished, [])
print("Chapter 190 updated.")
