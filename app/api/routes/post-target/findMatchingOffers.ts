function findMatchingOffers(
    buyingTargets: BuyingTarget[],
    routeOffers: RouteOffer[]
) {
    const machingTargets = [];
    for (const offer of routeOffers) {
        for (const target of buyingTargets) {
            if (
                offer.destination_code === target.destination_code &&
                offer.route_type === target.route_type
            ) {
                machingTargets.push({
                    Offer: offer,
                });
            }
        }
    }

    return machingTargets;
}

export default findMatchingOffers;
