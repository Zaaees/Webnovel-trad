import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from update_chapter import update_chapter

new_lore = [
    {
        "id": "g-auto-chun-muhey",
        "original": "Chun Muhey",
        "translation": "Chun Muhey",
        "notes": "Seigneur du Culte Démoniaque d'il y a 500 ans."
    },
    {
        "id": "g-auto-sword-demon",
        "original": "Sword Demon",
        "translation": "Démon de l'Épée",
        "notes": "Légendaire bretteur du Culte Démoniaque, Premier Doyen et Vice-Seigneur. Créateur du nouvel Art de l'Épée du Démon Céleste."
    },
    {
        "id": "g-auto-demon-sword",
        "original": "Demon Sword",
        "translation": "Démon de l'Épée",
        "notes": "Autre appellation du Sword Demon."
    },
    {
        "id": "g-auto-right-guardian",
        "original": "Right Guardian",
        "translation": "Gardien Droit",
        "notes": "Un des postes les plus haut placés du Culte Démoniaque."
    },
    {
        "id": "g-auto-wulin",
        "original": "Wulin",
        "translation": "Murim",
        "notes": "Le monde des arts martiaux."
    },
    {
        "id": "g-auto-yulin",
        "original": "Yulin",
        "translation": "Forces de la Justice",
        "notes": "La faction orthodoxe."
    },
    {
        "id": "g-auto-elder-council",
        "original": "Elder Council",
        "translation": "Conseil des Doyens",
        "notes": "Organe dirigeant du Culte Démoniaque composé des anciens."
    },
    {
        "id": "g-auto-vice-lord",
        "original": "Vice Lord",
        "translation": "Vice-Seigneur",
        "notes": "Titre donné au dirigeant par intérim du Culte."
    },
    {
        "id": "g-auto-sword-force-sky-demon",
        "original": "Sword Force of the Sky Demon",
        "translation": "Force d'Épée du Démon Céleste",
        "notes": "L'art martial suprême originel laissé par le Père Chun Ma."
    },
    {
        "id": "g-auto-sword-art-sky-demon",
        "original": "Sword Art of the Sky Demon",
        "translation": "Art de l'Épée du Démon Céleste",
        "notes": "La version reconstruite de l'art du Démon Céleste créée par le Démon de l'Épée."
    },
    {
        "id": "g-auto-demonic-academy",
        "original": "Demonic Academy",
        "translation": "Académie Démoniaque",
        "notes": "Lieu d'entraînement des futurs piliers du Culte Démoniaque."
    },
    {
        "id": "g-auto-father-chun-ma",
        "original": "Father Chun Ma",
        "translation": "Père Chun Ma",
        "notes": "Le fondateur mythique du Culte Démoniaque."
    }
]

title = "Chapitre 134"

draft = """« C'est ainsi que les choses se sont déroulées pendant longtemps, jusqu'au jour où... »
Le Seigneur du Culte Démoniaque était initialement tenu d'entreprendre un pèlerinage après son accession au trône. Chun Muhey, Seigneur d'il y a cinq cents ans, était également soumis à cette règle et était parti en pèlerinage cinq ans après être devenu le Seigneur.
« Et lors de ce pèlerinage... le pire incident de l'histoire de notre Culte s'est produit. »
Chaque membre ayant participé au pèlerinage était revenu sous forme de cadavre. C'est à ce moment-là que le Gardien Droit de l'époque périt également, et ce sans laisser de successeur. Cela nécessita la nomination d'un nouveau Gardien Droit. La mort de l'un des cinq plus grands guerriers du Murim provoqua une onde de choc aussi bien au sein du Culte que dans tout le Murim.
« Qui aurait pu tuer le Seigneur, lui qui faisait partie des cinq meilleurs guerriers des Forces de la Justice ? »
« ...Avez-vous entendu parler du Dieu du Sabre ? »
« Le Dieu du Sabre ! »
Les yeux de Yeowun s'écarquillèrent de choc. Il ne connaissait pas beaucoup de guerriers surpuissants du Murim, mais en tant que cultiste, il connaissait bien ce nom. C'était la seule personne connue que le Démon de l'Épée, un bretteur légendaire du Culte, n'avait pas pu vaincre. Ils avaient fini par faire match nul, mais le Démon de l'Épée avait perdu son bras droit lors de cet affrontement et avait dû se retirer des combats par la suite.
« Alors, le Démon de l'Épée a-t-il combattu le Dieu du Sabre pour se venger ? »
« Oui. Mais ce combat n'a pas eu lieu immédiatement. Avec l'assassinat du Seigneur, un immense problème s'est abattu sur notre Culte. »
Le plus gros problème était celui du successeur. Chun Muhey avait eu un seul enfant avec la Dame Démoniaque de l'époque, mais cet enfant était une fille. Et Chun Muhey, qui ne pouvait plus avoir d'autres enfants, avait dû partir en pèlerinage avant qu'il ne soit trop tard, sans se douter que ce serait son voyage vers la mort.
« Avec la mort du Seigneur, nous faisions face au problème de l'absence de successeur et de la perte de l'art à l'épée laissé par le Père Chun Ma, et ce, de façon simultanée. »
L'Art de l'Épée du Démon Céleste n'était enseigné que verbalement et ne possédait aucun manuel. C'était le pire scénario possible pour le Culte Démoniaque.
« Et pour résoudre ce problème, le Conseil des Doyens a choisi le Démon de l'Épée, alors Premier Doyen, pour occuper le poste de Vice-Seigneur. »
Ils ne pouvaient pas encore nommer la fille de Chun Muhey, âgée de huit ans, au titre de Seigneur, alors ils ont dû trouver une alternative. Fort heureusement, le Démon de l'Épée était doué dans tous les domaines, et pas seulement avec une épée. Il avait nettoyé et stabilisé le Culte très rapidement. Cela n'avait été possible que parce qu'il bénéficiait du respect de l'ensemble des cultistes. Ce que le Démon de l'Épée voulait résoudre en priorité après avoir stabilisé le Culte, c'était de retrouver l'Art de l'Épée du Démon Céleste. Il avait eu l'expérience d'un duel contre l'ancien Seigneur, mais il ne connaissait ni la technique de respiration ni la bonne circulation de l'énergie, de sorte qu'il n'y avait aucun moyen de le restaurer.
« C'est à ce moment-là que, pour la première fois, quelqu'un n'appartenant pas à la famille Chun a pénétré dans la grotte prison où le Père Chun Ma avait laissé ses secrets. »
'Ah... !'
Yeowun, qui connaissait le secret de la grotte prison, fut stupéfait. La grotte prison était connue à l'origine comme le lieu où le Père Chun Ma avait laissé ses secrets vers la vérité absolue avant sa mort. Seuls les membres de la famille Chun étaient autorisés à y entrer au début, mais ils ne pouvaient pas laisser la jeune fille y aller dans l'espoir de trouver quoi que ce soit. Et avec l'intention de s'approprier ce qui restait à l'intérieur, ou de créer quelque chose de meilleur si ce n'était pas possible, le Démon de l'Épée se heurta à un obstacle de taille.
« Tout le monde était entré dans la grotte prison jusqu'à présent, mais aucun n'avait appris la fondation de la vérité. Le Démon de l'Épée échoua également. »
« Pourquoi cela ? »
« Il était possible de reproduire la formation d'épée laissée par le Père Chun Ma à partir des marques gravées sur le piédestal, mais cela nécessitait la technique de respiration ou la circulation de l'énergie pour l'utiliser. »
'...Ainsi, personne n'avait percé ce secret.'
De nombreux membres de la famille Chun étaient entrés dans la grotte, mais aucun n'avait résolu le mystère qui s'y cachait. La Force d'Épée du Démon Céleste nécessitait d'utiliser la bonne technique de respiration inscrite sur la pierre brillante au-dessus de la grotte, ainsi que la circulation de l'énergie dissimulée derrière le poème.
« Ce n'est qu'après trois ans que le Démon de l'Épée est sorti de la grotte. »
Après trois années, le Démon de l'Épée avait ajouté sa propre compréhension à la Force d'Épée du Démon Céleste et avait créé le nouvel Art de l'Épée du Démon Céleste. Cet art était également si puissant qu'il n'avait pas grand-chose à envier à la technique à l'épée perdue du Seigneur ; ainsi, tous les doyens de l'époque acceptèrent qu'il l'enseigne à la fille du Seigneur défunt.
'Ah... Donc l'actuel Art de l'Épée du Démon Céleste a été créé par le Démon de l'Épée alors...'
C'était une chose que Yeowun ignorait jusqu'à présent. C'était la raison pour laquelle des marques d'épée recouvraient celles du Père Chun Ma à l'arrière de chaque piédestal. Mais ce qu'il ne parvenait pas à comprendre, c'était pourquoi le Démon de l'Épée, entré pour apprendre la fondation de la vérité sur la pierre, avait endommagé le piédestal avec sa technique d'épée de riposte.
« Le Démon de l'Épée a ensuite déplacé tous les piédestaux portant les découvertes du Père Chun Ma dans les étages de la bibliothèque de l'Académie Démoniaque. Je suis certain que vous avez également vu le piédestal à chaque étage ? »
« ...Oui. Je les ai vus. »
Il ne pouvait pas mentir sur le fait de ne pas les avoir vus, étant donné que ces pierres étaient placées au centre de chaque étage.
« Les profondes entailles laissées à l'arrière de chaque piédestal ont été faites par le Démon de l'Épée lui-même. »
« Pourquoi le Démon de l'Épée a-t-il autant détruit le piédestal ? »
Il savait que c'était dû aux efforts du Démon de l'Épée pour contrer la Force d'Épée du Démon Céleste. Mais il n'y avait aucune raison pour que le Démon de l'Épée, qui n'était même pas un membre de la famille Chun, détruise de la sorte le trésor laissé par le Père Chun Ma.
« Le Démon de l'Épée avait déjà recopié les tracés d'épée laissés par le Père Chun Ma et en avait fait un manuel d'art à l'épée. »
« Oh. »
« Ces dégâts n'ont donc pas été faits sur un coup de tête. Le Démon de l'Épée ne pouvait pas détruire les tracés sans en garder une trace, il les avait donc déjà réorganisés avant d'y laisser ses marques et les avait placés dans le palais du Seigneur. Mais sans la technique de respiration ni la circulation d'énergie, cela restait inutile. »
« Cependant, les dommages infligés au piédestal... étaient d'une certaine façon inévitables. »"""

notes = "Le texte originel explique l'histoire du Démon de l'Épée (Sword Demon), du décès de Chun Muhey, et de la création du nouvel Art de l'Épée du Démon Céleste. Traduction fidèle du texte sans aucune omission. Les noms de lore ont été respectés et alignés."

polished = draft

update_chapter(134, title, draft, notes, polished, new_lore)
print("Updated chapter 134 successfully.")
