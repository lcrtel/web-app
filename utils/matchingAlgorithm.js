// matchingAlgorithm.js

function findPotentialMatches(routeOffers, buyingTargets) {
    const potentialMatches = [];

    // for (const buyingTarget of buyingTargets) {
    //     if (
    //         routeOffer.destination_code === buyingTarget.destination_code &&
    //         routeOffer.route_type === buyingTarget.route_type &&
    //         routeOffer.rate >= buyingTarget.rate
    //         // Add more criteria checks as needed
    //     ) {
    //         potentialMatches.push(buyingTarget);
    //     }
    // }
    for (const target of buyingTargets) {
        for (const offer of routeOffers) {
            if (
                target.destination_code === offer.destination_code
                // Add more criteria checks as needed
            ) {
                potentialMatches.push({
                    offer: offer.id,
                    target: target.id,
                });
            }
        }
    }

    return potentialMatches;
}

export default findPotentialMatches;
