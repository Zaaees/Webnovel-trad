import update_chapter
import json

ch_number = 154
title = "La Valeur d'un Héritier (8)"

draft_text = """'Oh !'

Quelqu'un parlait par message télépathique et Huan Yi ne faisait que le copier par la bouche.

[Ne savais-tu pas ? Les Anciens sont autorisés à tester la personne pour savoir si elle est digne de recevoir la médaille d'allégeance.]

« Ne savais-tu pas ? Les Anciens sont autorisés à tester la personne pour savoir si elle est digne de recevoir la médaille d'allégeance. »

Il savait maintenant pourquoi aucun des cous des sept Huan Yi ne tremblait. C'était parce qu'aucun d'entre eux n'envoyait de message télépathique. Le message venait clairement de l'arrière, à l'entrée de la maison d'hôtes.

'Ouah... alors je peux écouter les messages télépathiques !'

Il était plus choquant que Nano puisse entendre les messages télépathiques d'autres personnes. Mais Yeowun ne pouvait pas expliquer que la capacité de Nano lui permettait d'écouter les messages télépathiques, et il n'avait pas non plus besoin de le révéler.

« Tu prends du temps à répondre depuis que Mun Ku a fait les présentations. Je pensais que quelqu'un pourrait envoyer un message télépathique alors. »

« ?! »

« Mais j'ai vu que personne parmi ces sept personnes ne tremblait du cou pour envoyer le message télépathique. Alors cela signifiait qu'il n'y en avait qu'un qui pouvait envoyer le message. »

« Oh... »

Le visage de Nhu Yayen devint bizarre. Il avait reconnu Mun Ku au moment où il l'a vue à la porte géante devant le manoir. C'était le masque qu'il avait fait lui-même, alors il n'y avait aucun moyen qu'il ne la reconnaisse pas. Il n'avait pas prévu de prendre d'autres personnes, mais a changé d'avis.

'Non. Utilisons-la.'

Si Mun Ku était là pour aider Yeowun, alors il a pensé que Mun Ku essaierait d'aider Yeowun à découvrir qui était le vrai Huan Yi. Donc, s'il trompe Mun Ku, la seule connaissance de Huan Yi, Nhu Yayen a pensé que cela rendrait plus difficile pour Yeowun de le trouver.

« Je l'ai autorisée à se joindre, pour rendre cela plus confus mais cela a en fait travaillé contre moi. Tu es incroyable. »

Nhu Yayen a accepté la perception de Yeowun sur la question. Il ne pensait pas qu'un adolescent juste avant l'âge adulte puisse réfléchir de façon aussi rationnelle. Nhu Yayen a ensuite souri d'une manière féminine à Yeowun, toujours avec son qi de force bloquant le qi de force de Yeowun et a parlé.

« Je suis Huan Yi, le chef du Clan des Illusions Fantômes. »

« Je suis Chun Yeowun. »

« Tu as passé le premier test, alors devrions-nous passer au suivant ? »

« Quel est le deuxième test ? »

« Nous sommes le Culte Démoniaque. Si tu veux mon approbation, prouve ta valeur avec ta puissance en tant qu'artiste martial. »

Et à ce moment-là, la main de Huan Yi a libéré une forte puissance et a rejeté la main de Yeowun vers l'arrière.

'Il est puissant.'

Yeowun a essayé de réagir rapidement, mais la main de Nhu Yayen a créé de nombreuses ombres en chargeant. Yeowun a bloqué avec la lame de la Danse du Papillon, mais il a été frappé par un coup de pied rapide sur la poitrine et a été projeté dans la cour devant la maison d'hôtes.

« Ugh ! »

Et comme il s'est posé sur son pied, l'énergie qui est entrée en lui par le coup de pied a été expulsée de son corps, et le sol sur lequel il a posé son pied s'est fissuré.

« Prince ! »

Mun Ku a crié sous le choc. Elle pensait que Huan Yi était fort car il était l'un des 12 Anciens, mais elle ne pouvait même pas suivre le mouvement de Huan Yi car il était trop rapide. Huan Yi est sorti de la maison d'hôtes et s'est approché de Chun Yeowun.

« J'ai pensé que nous pourrions endommager la maison d'hôtes si nous combattions à l'intérieur. »

'Art des Esprits Fantômes'

Yeowun s'est souvenu de la formation que Huan Yi venait d'exécuter. C'était la formation de l'Art des Esprits Fantômes que Yeowun a vue au cinquième étage de la bibliothèque de l'Académie Démoniaque. La différence était que c'était plus précis et avait corrigé plusieurs de ses problèmes par rapport à celle de la bibliothèque.

'Donc, même si je pense que c'est la formation que j'ai vue à la bibliothèque, je ne devrais pas penser que c'est la même chose.'

Un artiste martial avec une telle puissance était sûr d'augmenter et de faire évoluer son art martial au fil du temps. Yeowun est devenu sérieux et Huan Yi a souri.

« J'attendais cela avec impatience après avoir entendu que tu as battu le chef du Clan du Poison. Ce vieil homme marchait avec un bâton, mais c'était un vrai monstre. »

Huan Yi n'avait jamais combattu contre Baek Oh lui-même, mais il a vu la puissance de Baek Oh plusieurs fois lors de la guerre. Huan Yi était un homme étrange, mais il était aussi un artiste martial. Il ne pouvait pas combattre Baek Oh car ils étaient les mêmes Anciens, mais il avait imaginé combattre Baek Oh de nombreuses fois. Mais même après avoir essayé de nombreuses fois, le résultat de son imagination était toujours de perdre face à Baek Oh.

'Si tu l'as vaincu, tu peux être mon alternative.'

Il voulait tester à travers Chun Yeowun. S'il allait vaincre Yeowun, alors cela signifiait qu'il avait surmonté Baek Oh aussi.

« J'ai entendu dire que tu es doué avec la lame ? Et que tu as été instruit par le Gardien de Droite Submeng ? »

Et pendant qu'il parlait, un des faux Huan Yi de la table s'est approché et a donné une lame rouge à Huan Yi. Lorsqu'il l'a sortie, une lame décorée s'est révélée. Elle était créée avec de l'acier froid, coloré en métal sombre. Elle ressemblait à une très belle arme.

« Bien. Ma spécialité est aussi avec la lame. »"""

validation_notes = """Report: All paragraphs are aligned and no line was omitted. The text precisely translates the dialogs, thoughts (indicated by single quotes), and telepathic messages (brackets). The semantics and nuances are preserved, maintaining the correct narrative flow."""

translated_text = """'Oh !'

Quelqu'un transmettait un message télépathique que Huan Yi se contentait de relayer de vive voix.

[Tu ne le savais pas ? Les Anciens sont autorisés à évaluer un candidat pour déterminer s'il est digne de recevoir la médaille d'allégeance.]

« Tu ne le savais pas ? Les Anciens sont autorisés à évaluer un candidat pour déterminer s'il est digne de recevoir la médaille d'allégeance. »

Il comprenait désormais pourquoi la gorge d'aucun des sept Huan Yi ne tressaillait. La raison en était simple : aucun d'entre eux n'était l'émetteur de ce message télépathique. La voix provenait distinctement de l'arrière, depuis l'entrée du pavillon des invités.

'Ouah... je suis donc capable d'intercepter les messages télépathiques !'

Il était encore plus sidérant que Nano puisse capter les transmissions mentales d'autrui. Toutefois, Yeowun ne pouvait justifier que l'aptitude de Nano lui permettait d'intercepter ces ondes, et il n'avait d'ailleurs nul besoin de le dévoiler.

« Tu as tardé à répondre depuis que Mun Ku a fait les présentations. J'en ai déduit que quelqu'un t'envoyait probablement un message télépathique à cet instant. »

« ?! »

« Mais j'ai observé que la gorge d'aucun de ces sept individus ne tressaillait pour l'émettre. Par conséquent, il ne pouvait y avoir qu'une seule personne capable de m'envoyer ce message. »

« Oh... »

Le visage de Nhu Yayen prit une expression perplexe. Il avait identifié Mun Ku dès qu'il l'avait aperçue au portail colossal devant le domaine. Puisqu'il avait confectionné ce masque lui-même, il était impossible qu'il ne la reconnaisse pas. Il n'avait initialement pas prévu de mêler d'autres personnes à son plan, mais il s'était ravisé.

'Non. Utilisons-la.'

Si Mun Ku était présente pour épauler Yeowun, Nhu Yayen pensait qu'elle tenterait de l'aider à démasquer le véritable Huan Yi. Il s'était dit qu'en trompant Mun Ku, la seule du groupe à connaître personnellement Huan Yi, cela compliquerait grandement la tâche de Yeowun pour le débusquer.

« J'ai toléré sa présence pour semer davantage la confusion, mais cela s'est retourné contre moi en fin de compte. Tu es impressionnant. »

Nhu Yayen admit la perspicacité de Yeowun. Il n'aurait jamais cru qu'un adolescent, à peine au seuil de l'âge adulte, puisse faire preuve d'un raisonnement aussi affûté. Toujours en opposant son propre qi pour bloquer celui de son adversaire, Nhu Yayen adressa à Yeowun un sourire aux traits féminins et déclara :

« Je suis Huan Yi, le chef du Clan des Illusions Fantômes. »

« Je suis Chun Yeowun. »

« Tu as franchi la première épreuve, que dirais-tu de passer à la suivante ? »

« En quoi consiste cette deuxième épreuve ? »

« Nous sommes le Culte Démoniaque. Si tu convoites mon approbation, prouve ta valeur par ta force en tant qu'artiste martial. »

À cet instant précis, la main de Huan Yi déchaîna une puissance colossale et repoussa violemment celle de Yeowun.

'Il est puissant.'

Yeowun tenta de riposter avec vivacité, mais la main de Nhu Yayen se divisa en une myriade d'ombres lors de son assaut. Yeowun para l'attaque avec le sabre de la Danse du Papillon, mais un coup de pied fulgurant le percuta de plein fouet au thorax, l'expédiant valser dans la cour devant le pavillon.

« Ugh ! »

Au moment où son pied percuta le sol, l'énergie destructrice du coup qu'il avait encaissé fut expulsée de son corps, fissurant violemment la terre sous son appui.

« Prince ! »

S'écria Mun Ku, terrifiée. Elle se doutait que Huan Yi, en tant que l'un des Douze Anciens, devait être un redoutable guerrier, mais ses mouvements étaient si véloces qu'elle peinait à les suivre du regard. Huan Yi quitta le pavillon et s'avança calmement vers Chun Yeowun.

« J'ai pensé que nous risquions de saccager le pavillon si nous nous affrontions à l'intérieur. »

'L'Art des Esprits Fantômes'

Yeowun reconnut la formation que Huan Yi venait de déployer. Il s'agissait de l'Art des Esprits Fantômes, une technique qu'il avait étudiée au cinquième étage de la bibliothèque de l'Académie Démoniaque. Cependant, celle-ci était bien plus acérée et dépourvue des nombreuses lacunes du manuel de la bibliothèque.

'Même si cette formation ressemble à celle des archives, ce serait une erreur mortelle de les considérer comme identiques.'

Un artiste martial de cette trempe perfectionnait et faisait inévitablement évoluer son art au fil des ans. L'expression de Yeowun devint grave, ce qui arracha un sourire à Huan Yi.

« J'attendais cette confrontation avec impatience depuis que j'ai appris que tu as vaincu le chef du Clan du Poison. Ce vieillard marchait peut-être avec une canne, mais il n'en restait pas moins un véritable monstre. »

Huan Yi n'avait jamais croisé le fer avec Baek Oh en personne, mais il avait été témoin de sa puissance à de maintes reprises sur le champ de bataille. Bien que Huan Yi fût un individu excentrique, il demeurait un pur artiste martial. Leur statut d'Anciens leur interdisait de s'entretuer, ce qui ne l'avait pas empêché de simuler ce duel des dizaines de fois dans son esprit. Or, quelle que fût l'issue de ses simulations, il finissait toujours vaincu par Baek Oh.

'Puisque tu l'as terrassé, tu constitueras une excellente alternative.'

Il désirait s'évaluer à travers Chun Yeowun. S'il parvenait à écraser Yeowun, cela prouverait qu'il aurait également pu surpasser Baek Oh.

« J'ai ouï-dire que tu excellais au maniement du sabre ? Et que tu avais reçu l'enseignement du Gardien de Droite Submeng ? »

Tout en parlant, l'un des sosies de Huan Yi restés à la table s'approcha et lui tendit un fourreau vermeil. Lorsqu'il dégaina, la lame ornementée apparut à la lumière. Forgée dans un acier glacial aux reflets ténébreux, elle dégageait l'aura d'une arme d'une qualité exceptionnelle.

« Parfait. Ma spécialité réside, elle aussi, dans l'art du sabre. »"""

new_lore = [
    {
        "id": "g-auto-mun-ku",
        "original": "Mun Ku",
        "translation": "Mun Ku",
        "notes": "Membre du culte et alliée de Chun Yeowun, souvent déguisée ou utilisant un masque pour cacher son identité."
    },
    {
        "id": "g-auto-art-of-ghost-spirits",
        "original": "Art of Ghost Spirits",
        "translation": "Art des Esprits Fantômes",
        "notes": "Art martial propre au Clan des Illusions Fantômes, basé sur des formations complexes et des mouvements imprévisibles."
    },
    {
        "id": "g-auto-right-guardian-submeng",
        "original": "Right Guardian Submeng",
        "translation": "Gardien de Droite Submeng",
        "notes": "L'un des Gardiens du Culte Démoniaque, maître de sabre de renommée et instructeur martial de Chun Yeowun."
    },
    {
        "id": "g-auto-baek-oh",
        "original": "Baek Oh",
        "translation": "Baek Oh",
        "notes": "Le puissant chef du Clan du Poison, connu pour sa maîtrise redoutable du poison et son hostilité."
    }
]

update_chapter.update_chapter(ch_number, title, draft_text, validation_notes, translated_text, new_lore)
