function findMatchingTargets(
    routeOffers: RouteOffer[],
    buyingTargets: BuyingTarget[]
) {
    const machingTargets = [];
    for (const target of buyingTargets) {
        for (const offer of routeOffers) {
            if (
                target.destination_code === offer.destination_code &&
                target.route_type === offer.route_type
            ) {
                machingTargets.push({
                    target: target,
                });
            }
        }
    }

    return machingTargets;
}

export default findMatchingTargets;
