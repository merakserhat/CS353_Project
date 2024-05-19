interface Nutrition {
    fe_id: string;
    nut_id: string;
    plan_id: string;
    portion: number;
}

interface NutritionPlanModel {
    description: string;
    fe_id: string;
    name: string;
    nutritions: Nutrition[];
    plan_id: string;
}