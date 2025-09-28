from __future__ import annotations

from django.core.management.base import BaseCommand, CommandError

from tenants.models import Client, Domain


class Command(BaseCommand):
    help = "Cria um tenant e domínio associado"

    def add_arguments(self, parser):
        parser.add_argument("schema", type=str)
        parser.add_argument("domain", type=str)
        parser.add_argument("name", type=str)
        parser.add_argument("--plan", type=str, default="standard")

    def handle(self, *args, **options):
        schema = options["schema"]
        domain = options["domain"]
        name = options["name"]
        plan = options["plan"]

        if Client.objects.filter(schema_name=schema).exists():
            raise CommandError("Schema já existe")

        tenant = Client(schema_name=schema, name=name, plan=plan)
        tenant.save()

        Domain.objects.create(
            domain=domain,
            tenant=tenant,
            is_primary=True,
        )

        self.stdout.write(self.style.SUCCESS(f"Tenant {name} criado com schema {schema}"))
